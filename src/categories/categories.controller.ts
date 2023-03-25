import {
  Controller,
  Get,
  Post,
  UseGuards,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
  Param,
  Query,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SearchDto } from '../utils';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAllCategories(@Query() dto: SearchDto) {
    let { item, page } = dto;
    return this.categoriesService.getAllCategories(item, page);
  }

  @Post()
  @UseGuards(JwtGuard)
  createCategory(
    @GetUser('role') role: string,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(role, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateCategory(
    @GetUser('role') role: string,

    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(role, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteCategory(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return this.categoriesService.deleteCategory(role, deleteId);
  }

  @Get('id=:id')
  getCategorybyId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findCategoryById(id);
  }

  @Get('search')
  getCategorybyName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.categoriesService.findCategoryByName(item, page, name);
  }
}
