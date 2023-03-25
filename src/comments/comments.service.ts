import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(userId: number, dto: CreateCommentDto) {
    const gig = await this.prisma.gigs.findUnique({
      where: {
        id: dto.gigId,
      },
    });
    if (!gig) {
      throw new NotFoundException('Gig not found');
    }
    const comment = await this.prisma.comments.create({
      data: { ...dto, userId },
    });
    return comment;
  }

  async getComment(id: number) {
    const comment = await this.prisma.comments.findUnique({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
}
