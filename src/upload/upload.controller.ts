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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto';

@ApiTags('Image Upload')
@ApiBearerAuth()
@Controller('image')
@UseGuards(JwtGuard)
@UseInterceptors(imageUploadInterceptor())
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @ApiOperation({ summary: 'Upload personal profile image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chose an image',
    type: FileUploadDto,
  })
  @Post('me')
  async uploadMyImage(
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadMyImage(userId, file);
  }

  @ApiOperation({ summary: 'Upload user image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chose an image',
    type: FileUploadDto,
  })
  @Post('user/:userId')
  async uploadUserImage(
    @GetUser('role') role: string,
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadUserImage(role, userId, file);
  }

  @ApiOperation({ summary: 'Upload job image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chose an image',
    type: FileUploadDto,
  })
  @Post('job/:jobId')
  async uploadJobImage(
    @GetUser('role') role: string,
    @Param('jobId', ParseIntPipe) jobId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadJobImage(role, jobId, file);
  }

  @ApiOperation({ summary: 'Upload gig image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chose an image',
    type: FileUploadDto,
  })
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
