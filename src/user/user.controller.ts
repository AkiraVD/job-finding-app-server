import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
  Param,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto, SearchDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  @UseGuards(JwtGuard)
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteUser(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return this.userService.deleteUser(role, deleteId);
  }

  @Get('')
  getAllUsersPagination(@Query() dto: SearchDto) {
    let { item, page } = dto;
    return this.userService.findAllUser(item, page);
  }

  @Get('id=:id')
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserById(userId);
  }

  @Get('search')
  getUserByName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.userService.findUserByName(item, page, name);
  }
}
