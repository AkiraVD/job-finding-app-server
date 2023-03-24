import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { imageUploadInterceptor } from './interceptor/imageUploadInterceptor';
import { UploadService } from './upload.service';
import * as fs from 'fs';
import { FILE_PATH } from '../utils';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('image')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(imageUploadInterceptor())
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file);
  }

  @Delete(':image')
  async deleteImage(@Param('image') filename: string) {
    fs.unlinkSync(FILE_PATH + filename);
    return 'FILE DELETED';
  }

  @Post('user')
  @UseGuards(JwtGuard)
  @UseInterceptors(imageUploadInterceptor())
  async uploadUserImage(
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadUserImage(userId, file);
  }
}
