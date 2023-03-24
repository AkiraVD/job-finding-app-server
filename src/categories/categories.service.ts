import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = await this.prisma.categories.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (category) {
      throw new ForbiddenException('Name already exists');
    }
    const data = await this.prisma.categories.create({
      data: {
        name: dto.name,
      },
    });
    return data;
  }

  async updateCategory(id: number, dto: CreateCategoryDto) {
    const category = await this.prisma.categories.update({
      where: { id },
      data: {
        ...dto,
      },
    });
    return category;
  }

  async deleteCategory(role: string, deleteId: number) {
    await this.findCategoryById(deleteId);

    if (role === 'ADMIN') {
      await this.prisma.categories.delete({
        where: {
          id: deleteId,
        },
      });
      return 'CATEGORY DELETED';
    } else {
      throw new UnauthorizedException('Access to resources denied');
    }
  }

  async findCategoryById(id: number) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        jobs: {
          select: { id: true, createdAt: true, name: true, picture: true },
        },
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findCategoryByName(item: number, page: number, name: string) {
    const count = await this.prisma.categories.count({
      where: {
        name: {
          contains: name,
        },
      },
    });
    const catelogies = await this.prisma.categories.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      select: {
        id: true,
        name: true,
        jobs: {
          select: { id: true, createdAt: true, name: true, picture: true },
        },
      },
      skip: item * page,
      take: item,
    });
    return { count, catelogies };
  }
}
