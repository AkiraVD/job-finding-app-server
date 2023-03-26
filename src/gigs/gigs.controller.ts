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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SearchDto, SearchDtoNoName } from '../utils';
import { CreateGigDto, UpdateGigDto } from './dto';
import { GigsService } from './gigs.service';

@ApiTags('Gigs')
@Controller('gigs')
export class GigsController {
  constructor(private gigsService: GigsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all gigs (limit to 50)' })
  getGigs() {
    return this.gigsService.getGigs();
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new gig' })
  createGig(@GetUser('id') userId: number, @Body() dto: CreateGigDto) {
    return this.gigsService.createGig(userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing gig' })
  updateGig(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) gigId: number,
    @Body() dto: UpdateGigDto,
  ) {
    return this.gigsService.updateGig(userId, gigId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an existing gig' })
  deleteGigs(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) gigId: number,
  ) {
    return this.gigsService.deleteGig(userId, gigId);
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get gigs with pagination' })
  getGigsPagination(@Query() dto: SearchDtoNoName) {
    let { item, page } = dto;
    return this.gigsService.getGigsPagination(item, page);
  }

  @ApiOperation({ summary: 'Get gig by ID' })
  @Get('id=:id')
  getGigsById(@Param('id', ParseIntPipe) id: number) {
    return this.gigsService.getGigById(id);
  }

  @ApiOperation({ summary: 'Get gig details by ID' })
  @Get('detail/:id')
  getGigDetails(@Param('id', ParseIntPipe) id: number) {
    return this.gigsService.getGigDetailsById(id);
  }

  @ApiOperation({ summary: 'Search gigs by name' })
  @Get('search')
  searchGigsByName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.gigsService.searchGigsByName(item, page, name);
  }

  @ApiOperation({ summary: 'Get gigs by category' })
  @Get('category/:categoryId')
  getGigsByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query() dto: SearchDtoNoName,
  ) {
    let { item, page } = dto;
    return this.gigsService.getGigsByCategory(categoryId, item, page);
  }

  @ApiOperation({ summary: 'Get gigs by job' })
  @Get('job/:jobId')
  getGigsByJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Query() dto: SearchDtoNoName,
  ) {
    let { item, page } = dto;
    return this.gigsService.getGigsByJob(jobId, item, page);
  }

  @ApiOperation({ summary: 'Get gigs by user' })
  @Get('user/:userId')
  getGigsByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() dto: SearchDtoNoName,
  ) {
    let { item, page } = dto;
    return this.gigsService.getGigsByUser(userId, item, page);
  }
}
