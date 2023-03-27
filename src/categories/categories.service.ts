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

  async createCategory(role: string, dto: CreateCategoryDto) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
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

  async updateCategory(role: string, id: number, dto: CreateCategoryDto) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    await this.findCategoryById(id);
    const category = await this.prisma.categories.update({
      where: { id },
      data: {
        ...dto,
      },
    });
    return category;
  }

  async deleteCategory(role: string, deleteId: number) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    await this.findCategoryById(deleteId);
    await this.prisma.categories.delete({
      where: {
        id: deleteId,
      },
    });
    return 'CATEGORY DELETED';
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

  async getAllCategories(item: number, page: number) {
    const count = await this.prisma.categories.count({});
    const categories = await this.prisma.categories.findMany({
      where: {},
      skip: item * page,
      take: item,
    });
    return { count, item, page, categories };
  }

  async findCategoryByName(
    item: number,
    page: number,
    name: string | null = '',
  ) {
    const count = await this.prisma.categories.count({
      where: {
        name: {
          contains: name,
        },
      },
    });
    const categories = await this.prisma.categories.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: item * page,
      take: item,
    });
    return { count, item, page, categories };
  }
}
