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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SearchDto, SearchDtoNoName } from '../utils';
import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(public ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get orders' })
  getOrders(@Query() dto: SearchDtoNoName) {
    let { item, page } = dto;
    return this.ordersService.getOrders(item, page);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create order' })
  @ApiBearerAuth()
  createOrder(
    @GetUser('id', ParseIntPipe) buyerId: number,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(buyerId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update order status' })
  @ApiBearerAuth()
  updateOrderStatus(
    @GetUser('id', ParseIntPipe) creatorId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.ordersService.updateOrderStatus(orderId, creatorId);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete order' })
  @ApiBearerAuth()
  deleteOrder(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.ordersService.deleteOrder(orderId, userId);
  }

  @Get('id=:id')
  @ApiOperation({ summary: 'Get order by ID' })
  getOrdersById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrdersById(id);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get my gig orders' })
  @ApiBearerAuth()
  getMyGigOrders(@GetUser('id') userId: number, @Query() dto: SearchDtoNoName) {
    let { item, page } = dto;
    return this.ordersService.getMyGigOrders(userId, item, page);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get orders by user' })
  getOrdersByUser(
    @Param('id', ParseIntPipe) userId: number,
    @Query() dto: SearchDtoNoName,
  ) {
    let { item, page } = dto;
    return this.ordersService.getOrdersByUser(userId, item, page);
  }

  @Get('gig/:id')
  @ApiOperation({ summary: 'Get orders by gig' })
  getOrdersByGig(
    @Param('id', ParseIntPipe) gigId: number,
    @Query() dto: SearchDtoNoName,
  ) {
    let { item, page } = dto;
    return this.ordersService.getOrdersByGig(gigId, item, page);
  }
}
