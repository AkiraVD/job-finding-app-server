import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, UserService],
})
export class UploadModule {}
