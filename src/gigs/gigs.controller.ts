import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GigsService } from './gigs.service';

@Controller('gigs')
export class GigsController {
  constructor(private gigsService: GigsService) {}

  @Get()
  getGigs() {
    return 'GET GIGS';
  }

  @Post()
  createGig() {
    return 'CREATE GIGS';
  }

  @Patch()
  updateGig() {
    return 'UPDATE GIGS';
  }

  @Delete(':id')
  deleteGigs(@Param('id', ParseIntPipe) id: number) {
    return 'DELETE GIGS ' + id;
  }

  @Get('id=:id')
  getGigsById(@Param('id', ParseIntPipe) id: number) {
    return 'GET GIGS ID ' + id;
  }

  @Get('name/:name')
  getGigsByName(@Param('name') name: string) {
    return 'GET GIGS BY NAME ' + name;
  }

  @Get('category/:category')
  getGigsByCategory(@Param('category') category: string) {
    return 'GET GIGS BY CATEGORY ' + category;
  }

  @Get('job/:job')
  getGigsByJob(@Param('job') job: string) {
    return 'GET GIGS BY JOB ' + job;
  }

  @Get('detail/:id')
  getGigDetails(@Param('id', ParseIntPipe) id: number) {
    return 'GET GIGS DETAILS ' + id;
  }
}
