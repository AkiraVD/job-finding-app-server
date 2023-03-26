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
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SearchDto, SearchDtoNoName } from '../utils';
import { EditUserDto, CreateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { EditMeDto } from './dto/edit-me.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my informations' })
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update my informations' })
  updateMe(@GetUser('id') userId: number, @Body() dto: EditMeDto) {
    return this.userService.editMe(userId, dto);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new user manually' })
  createUser(@GetUser('role') role: string, @Body() dto: CreateUserDto) {
    return this.userService.createUser(role, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit user information' })
  editUser(
    @Param('id', ParseIntPipe) updateId: number,
    @GetUser('role') role: string,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(updateId, role, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user information' })
  deleteUser(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return this.userService.deleteUser(role, deleteId);
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get all users with Pagination' })
  getAllUsersPagination(@Query() dto: SearchDtoNoName) {
    let { item, page } = dto;
    return this.userService.getAllUsersPagination(item, page);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all users (limit to 50 users)' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('id=:id')
  @ApiOperation({ summary: 'Find user by ID' })
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserById(userId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search user by name' })
  getUserByName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.userService.findUserByName(item, page, name);
  }
}
