import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  async createOrder() {
    return 'CREATE ORDER';
  }

  async updateOrder(id: number) {
    return 'UPDATE ORDER ' + id;
  }

  async deleteOrder(id: number) {
    return 'DELETE ORDER ' + id;
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
