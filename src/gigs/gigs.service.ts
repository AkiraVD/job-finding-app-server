import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGigDto } from './dto';

@Injectable()
export class GigsService {
  constructor(private prisma: PrismaService) {}

  async getGigs() {
    return this.prisma.gigs.findMany({});
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
