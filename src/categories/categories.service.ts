import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategory } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    let data = await this.prisma.categories.findMany({
      select: { id: true, name: true, jobs: true },
    });
    return data;
  }

  async createCategory(dto: CreateCategory) {
    let category = await this.prisma.categories.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (category) {
      throw new ForbiddenException('Name already exists');
    }
    let data = await this.prisma.categories.create({
      data: {
        name: dto.name,
      },
    });

    return data;
  }
}
