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
import { UpdateJobDto } from './dto';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.jobsService.findJobByName(item, page, name);
  }

  @Post()
  @UseGuards(JwtGuard)
  createJob(@Body() dto: CreateJobDto) {
    return this.jobsService.createJob(dto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateJob(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJobDto) {
    return this.jobsService.updateJob(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteJob(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return this.jobsService.deleteJob(role, deleteId);
  }

  @Get('id=:id')
  getJobById(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findJobById(id);
  }

  @Get('search')
  getJobByName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.jobsService.findJobByName(item, page, name);
  }
}
