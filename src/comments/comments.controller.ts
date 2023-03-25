import {
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

@Controller('comments')
export class CommentsController {
  @Post()
  @UseGuards(JwtGuard)
  createComment(@GetUser('id') userId: number) {
    return 'CREATE Comment';
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  editComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return 'Edit Comment ' + id;
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return 'Delete Comment ' + id;
  }

  @Get(':id')
  getComment(@Param('id', ParseIntPipe) id: number) {
    return 'Get Comment by id ' + id;
  }

  @Get('gig/:gigId')
  getCommentByGig(@Param('gigId', ParseIntPipe) gigId: number) {
    return 'Get Comment by gig id ' + gigId;
  }
}
