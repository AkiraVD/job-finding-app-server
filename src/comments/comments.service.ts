import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

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

  async editComment(userId: number, id: number, dto: UpdateCommentDto) {
    const comment = await this.prisma.comments.findUnique({
      where: {
        id,
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (userId !== comment.userId) {
      throw new UnauthorizedException('Access to resources denied');
    }
    return await this.prisma.comments.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteComment(userId: number, id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const comment = await this.prisma.comments.findUnique({
      where: {
        id,
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (userId !== comment.userId || user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access to resources denied');
    }
    await this.prisma.comments.delete({ where: { id } });
    return 'COMMENT DELETED SUCCESSFUL';
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
