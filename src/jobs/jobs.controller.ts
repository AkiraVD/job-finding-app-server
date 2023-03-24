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
import { SearchDto } from '../utils';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return 'GET_MANY_JOBS';
  }

  @Post()
  @UseGuards(JwtGuard)
  createJob(@Body() dto: CreateJobDto) {
    return this.jobsService.createJob(dto);
  }

  @Patch(':id')
  //   @UseGuards(JwtGuard)
  updateJob(@Param('id', ParseIntPipe) id: number) {
    return 'UPDATE_JOB_' + id;
  }

  @Delete(':id')
  //   @UseGuards(JwtGuard)
  deleteJob(
    // @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return 'DELETE_JOB_' + deleteId;
  }

  @Get('id=:id')
  getJobById(@Param('id', ParseIntPipe) id: number) {
    return 'GET_JOB_BY_ID_' + id;
  }

  @Get('search')
  getJobByName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return 'GET_JOB_BY_ID_';
  }
}
