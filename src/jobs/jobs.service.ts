import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto/';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService,
  ) {}

  async createJob(role: string, dto: CreateJobDto) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    const category = await this.categoriesService.findCategoryById(
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

  async updateJob(role: string, id: number, dto: UpdateJobDto) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    const { name, picture } = dto;
    const job = await this.prisma.jobs.update({
      where: { id },
      data: {
        name,
        picture,
      },
    });
    return job;
  }

  async deleteJob(role: string, deleteId: number) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    await this.findJobById(deleteId);
    await this.prisma.jobs.delete({
      where: {
        id: deleteId,
      },
    });
    return 'JOB DELETED';
  }

  async findJobById(id: number) {
    const job = await this.prisma.jobs.findUnique({
      where: {
        id,
      },
      select: { id: true, name: true, picture: true, gigs: true },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async findJobByName(item: number, page: number, name: string = '') {
    const count = await this.prisma.jobs.count({
      where: {
        name: {
          contains: name,
        },
      },
    });
    const jobs = await this.prisma.jobs.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      select: { id: true, name: true, picture: true, gigs: true },
      skip: item * page,
      take: item,
    });
    return { count, item, page, jobs };
  }
}
