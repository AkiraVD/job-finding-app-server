import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGigDto, UpdateGigDto } from './dto';

@Injectable()
export class GigsService {
  constructor(private prisma: PrismaService) {}

  async getGigs() {
    const count = await this.prisma.gigs.count({});
    const gigs = await this.prisma.gigs.findMany({
      take: 50,
    });
    return { count, gigs };
  }

  async getGigsPagination(item: number, page: number) {
    const count = await this.prisma.gigs.count({});
    const gigs = await this.prisma.gigs.findMany({
      skip: item * page,
      take: item,
    });
    return { count, item, page, gigs };
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

  async updateGig(userId: number, gigId: number, dto: UpdateGigDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const gig = await this.prisma.gigs.findUnique({ where: { id: gigId } });
    const job = await this.prisma.jobs.findUnique({
      where: { id: dto.jobId || gig.jobId },
    });
    if (!gig) {
      throw new NotFoundException('Gig not found');
    }
    if (user.id !== gig.creatorId && user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    const data = await this.prisma.gigs.update({
      where: {
        id: gigId,
      },
      data: dto,
      include: {
        job: {
          select: {
            name: true,
            picture: true,
            category: { select: { id: true, name: true } },
          },
        },
      },
    });
    return data;
  }

  async deleteGig(userId: number, gigId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const gig = await this.prisma.gigs.findUnique({ where: { id: gigId } });
    if (!gig) {
      throw new NotFoundException('Gig not found');
    }
    if (user.id !== gig.creatorId && user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    await this.prisma.gigs.delete({ where: { id: gigId } });
    return 'GIG DELETED';
  }

  async getGigById(id: number) {
    const gig = await this.prisma.gigs.findUnique({
      where: { id },
    });
    if (!gig) {
      throw new NotFoundException('Gig not found');
    }
    return gig;
  }

  async getGigDetailsById(id: number) {
    const gig = await this.prisma.gigs.findUnique({
      where: { id },
      include: {
        job: {
          select: {
            name: true,
            picture: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        creator: {
          select: {
            fullname: true,
            email: true,
            profilePic: true,
          },
        },
        orders: true,
        comments: true,
      },
    });
    if (!gig) {
      throw new NotFoundException('Gig not found');
    }
    return gig;
  }

  async searchGigsByName(item: number, page: number, name: string) {
    const count = await this.prisma.gigs.count({
      where: {
        title: {
          contains: name,
        },
      },
    });
    const gigs = await this.prisma.gigs.findMany({
      where: {
        title: {
          contains: name,
        },
      },
      skip: item * page,
      take: item,
    });
    return { count, item, page, gigs };
  }

  async getGigsByCategory(categoryId: number, item: number, page: number) {
    const category = await this.prisma.categories.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const count = await this.prisma.gigs.count({
      where: {
        job: {
          categoryId,
        },
      },
    });
    const gigs = await this.prisma.gigs.findMany({
      where: {
        job: {
          categoryId,
        },
      },
      include: {
        job: {
          select: { name: true },
        },
      },
      skip: item * page,
      take: item,
    });
    return { count, category: category.name, item, page, gigs };
  }

  async getGigsByJob(jobId: number, item: number, page: number) {
    const job = await this.prisma.jobs.findUnique({
      where: { id: jobId },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    const count = await this.prisma.gigs.count({
      where: {
        jobId,
      },
    });
    const gigs = await this.prisma.gigs.findMany({
      where: {
        jobId,
      },
      skip: item * page,
      take: item,
    });
    return { count, job: job.name, item, page, gigs };
  }
}
