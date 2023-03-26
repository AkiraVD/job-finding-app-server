import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  async getOrders() {
    return 'GET ORDERS';
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
