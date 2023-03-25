import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { FILE_PATH } from '../utils';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async uploadMyImage(id: number, file: Express.Multer.File) {
    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    let user = await this.userService.findUserById(id);
    if (user.profilePic) {
      this.deleteUploadedFile(user.profilePic);
    }
    const data = await this.userService.editMe(id, {
      profilePic: FILE_PATH + file.filename,
    });
    return data.profilePic;
  }

  async uploadUserImage(role: string, id: number, file: Express.Multer.File) {
    if (role !== 'ADMIN') {
      this.deleteUploadedFile(FILE_PATH + file.filename);
      throw new UnauthorizedException('Access to resources denied');
    }
    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    let user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      await this.deleteUploadedFile(FILE_PATH + file.filename);
      throw new NotFoundException(`User not found`);
    }
    if (user.profilePic) {
      await this.deleteUploadedFile(user.profilePic);
    }
    const data = await this.userService.editMe(id, {
      profilePic: FILE_PATH + file.filename,
    });
    return data.profilePic;
  }

  async deleteUploadedFile(path: string) {
    fs.unlinkSync(path);
  }
}
