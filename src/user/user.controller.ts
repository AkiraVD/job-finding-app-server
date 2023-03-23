import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
  Param,
  DefaultValuePipe,
} from '@nestjs/common';
import { HttpCode, Query } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete(':id')
  deleteUser(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return this.userService.deleteUser(role, deleteId);
  }

  @Get('')
  getAllUsersPagination(
    @Query('item', new DefaultValuePipe(10), ParseIntPipe) item: number,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.userService.findAllUser(item, page);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserById(userId);
  }
}
