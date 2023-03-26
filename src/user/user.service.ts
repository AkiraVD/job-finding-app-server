import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async formatUserData(data: any) {
    if (typeof data.skills !== 'string') {
      data.skills = JSON.stringify(data.skills);
    } else {
      data.skills = JSON.parse(data.skills);
    }
    if (typeof data.certifications !== 'string') {
      data.certifications = JSON.stringify(data.certifications);
    } else {
      data.certifications = JSON.parse(data.certifications);
    }
    delete data.hash;
    return data;
  }

  async createUser(role: string, dto: CreateUserDto) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    let user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new ForbiddenException('Email already exists');
    }
    let { password, ...rest } = dto;
    this.formatUserData(rest);
    const data = await this.prisma.user.create({
      data: { ...rest, hash: await argon.hash(password) },
    });
    return this.formatUserData(data);
  }

  async editMe(id: number, dto: EditUserDto) {
    let { password, ...rest } = dto;
    this.formatUserData(rest);
    const data = password
      ? { ...rest, hash: await argon.hash(password) }
      : rest;

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.formatUserData(user);
  }

  async editUser(id: number, role: string, dto: EditUserDto) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    await this.findUserById(id);
    let { password, ...rest } = dto;
    this.formatUserData(rest);
    const data = password
      ? { ...rest, hash: await argon.hash(password) }
      : rest;

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.formatUserData(user);
  }

  async deleteUser(role: string, deleteId: number) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    await this.findUserById(deleteId);
    await this.prisma.user.delete({
      where: {
        id: deleteId,
      },
    });
    return 'USER DELETED';
  }

  async getAllUsers() {
    const count = await this.prisma.user.count({});
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
      },
      take: 50, // Limit to 50 users
    });
    users.forEach((user) => {
      this.formatUserData(user);
      return user;
    });
    return { count, users };
  }

  async getAllUsersPagination(item: number, page: number) {
    const count = await this.prisma.user.count({});
    const users = await this.prisma.user.findMany({
      skip: item * page,
      take: item,
    });
    users.forEach((user) => {
      this.formatUserData(user);
      return user;
    });
    return { count, item, page, users };
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    delete user.hash;
    return this.formatUserData(user);
  }

  async findUserByName(item: number, page: number, name: string) {
    const count = await this.prisma.user.count({
      where: {
        fullname: {
          contains: name,
        },
      },
    });
    const users = await this.prisma.user.findMany({
      where: {
        fullname: {
          contains: name,
        },
      },
      include: { gigs: true, orders: true },
      skip: item * page,
      take: item,
    });
    users.forEach((user) => {
      this.formatUserData(user);
      delete user.hash;
      return user;
    });
    return { count, item, page, users };
  }
}
