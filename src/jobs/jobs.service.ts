import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService,
  ) {}

  async createJob(dto: CreateJobDto) {
    const category = await this.categoriesService.findCatelogyById(
      dto.categoryId,
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const job = await this.prisma.jobs.findFirst({
      where: {
        categoryId: dto.categoryId,
        name: dto.name,
      },
    });
    if (job) {
      throw new ForbiddenException('Job already exists in this category');
    }
    const data = await this.prisma.jobs.create({
      data: { ...dto },
    });
    return data;
  }
}
