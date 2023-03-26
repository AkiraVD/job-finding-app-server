import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SearchDto } from '../utils';
import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(public ordersService: OrdersService) {}

  @Get()
  getOrders(@Query() dto: SearchDto) {
    let { item, page } = dto;
    return this.ordersService.getOrders(item, page);
  }

  @Post()
  @UseGuards(JwtGuard)
  createOrder(
    @GetUser('id', ParseIntPipe) buyerId: number,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(buyerId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateOrderStatus(
    @GetUser('id', ParseIntPipe) creatorId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.ordersService.updateOrderStatus(orderId, creatorId);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteOrder(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.ordersService.deleteOrder(orderId, userId);
  }

  @Get('id=:id')
  getOrdersById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrdersById(id);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMyOrders(@GetUser('id') userId: number) {
    return this.ordersService.getMyOrders(userId);
  }

  @Get('user/:id')
  getOrdersByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.ordersService.getOrdersByUser(userId);
  }

  @Get('gig/:id')
  getOrdersByGig(@Param('id', ParseIntPipe) gigId: number) {
    return this.ordersService.getOrdersByGig(gigId);
  }
}
