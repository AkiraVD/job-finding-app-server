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
import { JwtGuard } from '../auth/guard';
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dto';

// @UseGuards(JwtGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  createCategory(@Body() dto: CreateCategory) {
    return this.categoriesService.createCategory(dto);
  }
}
