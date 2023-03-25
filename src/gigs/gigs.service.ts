import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGigDto } from './dto';

@Injectable()
export class GigsService {
  constructor(private prisma: PrismaService) {}

  async getGigs() {
    const count = await this.prisma.gigs.count({});
    const gigs = await this.prisma.gigs.findMany({});
    return { count, gigs };
  }

  async getGigsPagination(item: number, page: number) {
    const count = await this.prisma.gigs.count({});
    const gigs = await this.prisma.gigs.findMany({
      skip: item * page,
      take: item,
    });
    return { count, gigs };
  }

  async createGig(creatorId: number, dto: CreateGigDto) {
    const job = await this.prisma.jobs.findUnique({
      where: {
        id: dto.jobId,
      },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return this.prisma.gigs.create({
      data: { ...dto, creatorId },
    });
  }
}
