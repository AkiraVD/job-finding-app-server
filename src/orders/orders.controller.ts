import {
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
  createOrder() {
    return this.ordersService.createOrder();
  }

  @Patch(':id')
  updateOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.updateOrder(id);
  }

  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.deleteOrder(id);
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
