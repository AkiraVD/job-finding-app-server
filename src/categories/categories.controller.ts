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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { SearchDto } from '../utils';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories' })
  @Get()
  getAllCategories(@Query() dto: SearchDto) {
    let { item, page } = dto;
    return this.categoriesService.getAllCategories(item, page);
  }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @UseGuards(JwtGuard)
  @Post()
  createCategory(
    @GetUser('role') role: string,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(role, dto);
  }

  @ApiOperation({ summary: 'Update a category by id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  @UseGuards(JwtGuard)
  @Patch(':id')
  updateCategory(
    @GetUser('role') role: string,

    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(role, id, dto);
  }

  @ApiOperation({ summary: 'Delete a category by id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteCategory(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return this.categoriesService.deleteCategory(role, deleteId);
  }

  @ApiOperation({ summary: 'Get a category by id' })
  @Get('id=:id')
  getCategorybyId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findCategoryById(id);
  }

  @ApiOperation({ summary: 'Search a category by name' })
  @Get('search')
  getCategorybyName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.categoriesService.findCategoryByName(item, page, name);
  }
}
