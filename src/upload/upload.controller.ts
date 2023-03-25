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

  @Post('job/:id')
  async uploadJobImage(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) jobId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadJobImage(role, jobId, file);
  }
}
