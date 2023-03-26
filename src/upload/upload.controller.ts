import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { imageUploadInterceptor } from './interceptor/imageUploadInterceptor';
import { UploadService } from './upload.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('image')
@UseGuards(JwtGuard)
@UseInterceptors(imageUploadInterceptor())
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('me')
  async uploadMyImage(
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadMyImage(userId, file);
  }

  @Post('user/:id')
  async uploadUserImage(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadUserImage(role, userId, file);
  }

  @Post('job/:jobId')
  async uploadJobImage(
    @GetUser('role') role: string,
    @Param('jobId', ParseIntPipe) jobId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadJobImage(role, jobId, file);
  }

  @Post('gig/:gigId')
  async uploadGigImage(
    @GetUser('id') userId: number,
    @Param('gigId', ParseIntPipe) gigId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadGigImage(userId, gigId, file);
  }

  @Delete(':filename')
  deleteUploadedFile(@Param('filename') filename: string) {
    this.uploadService.deleteUploadedFile(filename);
    return filename + ' deleted successfully';
  }
}
