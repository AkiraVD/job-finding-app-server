import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SearchDto } from '../utils';
import { CreateGigDto, UpdateGigDto } from './dto';
import { GigsService } from './gigs.service';

@Controller('gigs')
export class GigsController {
  constructor(private gigsService: GigsService) {}

  @Get()
  getGigs() {
    return this.gigsService.getGigs();
  }

  @Get('pagination')
  getGigsPagination(@Query() dto: SearchDto) {
    let { item, page } = dto;
    return this.gigsService.getGigsPagination(item, page);
  }

  @Post()
  @UseGuards(JwtGuard)
  createGig(@GetUser('id') userId: number, @Body() dto: CreateGigDto) {
    return this.gigsService.createGig(userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateGig(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) gigId: number,
    @Body() dto: UpdateGigDto,
  ) {
    return this.gigsService.updateGig(userId, gigId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteGigs(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) gigId: number,
  ) {
    return this.gigsService.deleteGig(userId, gigId);
  }

  @Get('id=:id')
  getGigsById(@Param('id', ParseIntPipe) id: number) {
    return this.gigsService.getGigById(id);
  }

  @Get('detail/:id')
  getGigDetails(@Param('id', ParseIntPipe) id: number) {
    return this.gigsService.getGigDetailsById(id);
  }

  @Get('search')
  searchGigsByName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.gigsService.searchGigsByName(item, page, name);
  }

  @Get('category/:categoryId')
  getGigsByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query() dto: SearchDto,
  ) {
    let { item, page } = dto;
    return this.gigsService.getGigsByCategory(categoryId, item, page);
  }

  @Get('job/:jobId')
  getGigsByJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Query() dto: SearchDto,
  ) {
    let { item, page } = dto;
    return this.gigsService.getGigsByJob(jobId, item, page);
  }

  @Get('user/:userId')
  getGigsByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() dto: SearchDto,
  ) {
    let { item, page } = dto;
    return this.gigsService.getGigsByUser(userId, item, page);
  }
}
