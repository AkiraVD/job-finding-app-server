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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBearerAuth()
  createComment(@GetUser('id') userId: number, @Body() dto: CreateCommentDto) {
    return this.commentsService.createComment(userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update a comment by id' })
  @ApiBearerAuth()
  editComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.editComment(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete a comment by id' })
  @ApiBearerAuth()
  deleteComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentsService.deleteComment(userId, id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by id' })
  getComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getComment(id);
  }

  @Get('gig/:gigId')
  @ApiOperation({ summary: 'Get comments by gig id' })
  getCommentByGig(@Param('gigId', ParseIntPipe) gigId: number) {
    return this.commentsService.getCommentByGig(gigId);
  }
}
