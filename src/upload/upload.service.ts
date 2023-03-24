import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { FILE_PATH } from '../utils';

@Injectable()
export class UploadService {
  constructor(private userService: UserService) {}

  async uploadImage(file: Express.Multer.File) {
    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    return FILE_PATH + file.filename;
  }

  async uploadUserImage(id: number, file: Express.Multer.File) {
    let user = await this.userService.findUserById(id);
    return user;
    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    return FILE_PATH + file.filename;
  }
}
