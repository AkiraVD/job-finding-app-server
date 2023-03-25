import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtGuard)
  createComment(@GetUser('id') userId: number, @Body() dto: CreateCommentDto) {
    return this.commentsService.createComment(userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  editComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.editComment(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentsService.deleteComment(userId, id);
  }

  @Get(':id')
  getComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getComment(id);
  }

  @Get('gig/:gigId')
  getCommentByGig(@Param('gigId', ParseIntPipe) gigId: number) {
    return this.commentsService.getCommentByGig(gigId);
  }
}
