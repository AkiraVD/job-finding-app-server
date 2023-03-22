import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUserDto) {
    // If user changed password
    if (dto.password) {
      // generate password hash
      const hash = await argon.hash(dto.password);
      delete dto.password;
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...dto,
          hash,
        },
      });
      delete user.hash;
      return {
        ...user,
        certifications: JSON.parse(user.certifications),
        skills: JSON.parse(user.skills),
      };
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return {
      ...user,
      certifications: JSON.parse(user.certifications),
      skills: JSON.parse(user.skills),
    };
  }
}
