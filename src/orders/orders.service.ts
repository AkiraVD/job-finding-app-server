import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async getOrders(item: number, page: number) {
    const count = await this.prisma.orders.count({});
    const orders = await this.prisma.orders.findMany({
      skip: item * page,
      take: item,
    });
    return { count, orders };
  }

  async createOrder(buyerId: number, dto: CreateOrderDto) {
    const gig = await this.prisma.gigs.findUnique({
      where: { id: dto.gigId },
      select: {
        title: true,
        rate: true,
        price: true,
        creatorId: true,
      },
    });
    if (!gig) {
      throw new NotFoundException('Gig not found');
    }
    if (buyerId === gig.creatorId) {
      throw new ForbiddenException('Gig Creator cannot make their own order');
    }
    const order = await this.prisma.orders.create({
      data: { ...dto, buyerId },
    });
    return { gig, order };
  }

  async updateOrderStatus(orderId: number, creatorId: number) {
    const order = await this.prisma.orders.findUnique({
      where: { id: orderId },
      include: { gig: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (creatorId !== order.gig.creatorId) {
      throw new UnauthorizedException(
        'Only gig creator can update order status',
      );
    }
    const status = await this.prisma.orders.update({
      where: { id: orderId },
      data: {
        complete: !order.complete,
      },
    });
    return status;
  }

  async deleteOrder(orderId: number, userId: number) {
    const order = await this.prisma.orders.findUnique({
      where: { id: orderId },
      include: { gig: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (
      order.buyerId !== userId ||
      order.gig.creatorId !== userId ||
      user.role !== 'ADMIN'
    ) {
      throw new UnauthorizedException('Action is denied');
    }
    await this.prisma.orders.delete({
      where: { id: orderId },
    });
    return 'DELETED ORDER SUCCESSFUL';
  }

  async getOrdersById(id: number) {
    return 'GET ORDERS BY ID ' + id;
  }

  async getMyOrders(userId: number) {
    return 'GET MY ORDERS ' + userId;
  }

  async getOrdersByUser(userId: number) {
    return 'GET ORDERS BY USER ' + userId;
  }

  async getOrdersByGig(gigId: number) {
    return 'GET ORDERS BY GIG ' + gigId;
  }
}
