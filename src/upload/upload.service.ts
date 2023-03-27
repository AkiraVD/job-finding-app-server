import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FILE_PATH } from '../utils';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async deleteUploadedFile(filename: string) {
    const path = FILE_PATH + filename;
    if (!fs.existsSync(path)) {
      return;
    }
    return fs.unlinkSync(path);
  }

  async uploadMyImage(
    id: number,
    file: Express.Multer.File,
    serverUrl: string,
  ) {
    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user.profilePic) {
      this.deleteUploadedFile(user.profilePic);
    }
    const data = await this.prisma.user.update({
      where: { id },
      data: {
        profilePic: serverUrl + file.filename,
      },
    });
    return { message: 'Uploaded file successful', path: data.profilePic };
  }

  async uploadUserImage(
    role: string,
    id: number,
    file: Express.Multer.File,
    serverUrl: string,
  ) {
    if (role !== 'ADMIN') {
      this.deleteUploadedFile(file.filename);
      throw new UnauthorizedException('Access to resources denied');
    }
    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      await this.deleteUploadedFile(file.filename);
      throw new NotFoundException(`User not found`);
    }
    if (user.profilePic) {
      await this.deleteUploadedFile(user.profilePic);
    }
    const data = await this.prisma.user.update({
      where: { id },
      data: {
        profilePic: serverUrl + file.filename,
      },
    });
    return { message: 'Uploaded file successful', path: data.profilePic };
  }

  async uploadJobImage(
    role: string,
    id: number,
    file: Express.Multer.File,
    serverUrl: string,
  ) {
    if (role !== 'ADMIN') {
      this.deleteUploadedFile(file.filename);
      throw new UnauthorizedException('Access to resources denied');
    }
    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    const job = await this.prisma.jobs.findUnique({ where: { id } });
    if (!job) {
      await this.deleteUploadedFile(file.filename);
      throw new NotFoundException(`Job not found`);
    }
    if (job.picture) {
      await this.deleteUploadedFile(job.picture);
    }
    const data = await this.prisma.jobs.update({
      where: { id },
      data: {
        picture: serverUrl + file.filename,
      },
    });
    return { message: 'Uploaded file successful', path: data.picture };
  }

  async uploadGigImage(
    userId: number,
    gigId: number,
    file: Express.Multer.File,
    serverUrl: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const gig = await this.prisma.gigs.findUnique({ where: { id: gigId } });
    if (!gig) {
      await this.deleteUploadedFile(file.filename);
      throw new NotFoundException(`Gig not found`);
    }

    if (user.id !== gig.creatorId && user.role !== 'ADMIN') {
      await this.deleteUploadedFile(file.filename);
      throw new UnauthorizedException('Access to resources denied');
    }

    if (!file || file.size <= 0) {
      throw new BadRequestException('No file uploaded');
    }
    if (gig.picture) {
      await this.deleteUploadedFile(gig.picture);
    }
    const data = await this.prisma.gigs.update({
      where: { id: gigId },
      data: {
        picture: serverUrl + file.filename,
      },
    });
    return { message: 'Uploaded file successful', path: data.picture };
  }
}
