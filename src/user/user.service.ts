import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async formatUserData(data: any) {
    delete data.hash;
    data.certifications = JSON.parse(data.certifications);
    data.skills = JSON.parse(data.skills);
    return data;
  }

  async editUser(userId: number, dto: EditUserDto) {
    // Prevent users from changing their roles
    delete dto.role;
    // If user changed password
    if (dto.password) {
      const hash = await argon.hash(dto.password);
      delete dto.password;
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...dto,
          hash,
        },
      });
      return this.formatUserData(user);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });
    return this.formatUserData(user);
  }

  async deleteUser(role: string, deleteId: number) {
    await this.findUserById(deleteId);

    if (role === 'ADMIN') {
      await this.prisma.user.delete({
        where: {
          id: deleteId,
        },
      });
      return 'USER DELETED';
    } else {
      throw new UnauthorizedException('Access to resources denied');
    }
  }

  async findAllUser(item: number, page: number) {
    const count = await this.prisma.user.count({});
    const users = await this.prisma.user.findMany({
      include: { gigs: true, orders: true },
      skip: item * page,
      take: item,
    });
    users.forEach((user) => {
      return this.formatUserData(user);
    });
    return { count, users };
  }

  async findUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { gigs: true, orders: true },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return this.formatUserData(user);
  }

  async findUserByName(item: number, page: number, name: string) {
    if (!name) {
      return this.findAllUser(item, page);
    }
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
      return this.formatUserData(user);
    });
    return { count, users };
  }
}
