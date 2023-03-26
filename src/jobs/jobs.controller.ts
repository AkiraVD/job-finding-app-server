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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SearchDto, SearchDtoNoName } from '../utils';
import { UpdateJobDto } from './dto';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @ApiOperation({ summary: 'Get all jobs' })
  @Get()
  getJobs(@Query() dto: SearchDtoNoName) {
    let { item, page } = dto;
    return this.jobsService.findJobByName(item, page);
  }

  @ApiOperation({ summary: 'Create a new job' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  createJob(@GetUser('role') role: string, @Body() dto: CreateJobDto) {
    return this.jobsService.createJob(role, dto);
  }

  @ApiOperation({ summary: 'Update a job' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  updateJob(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobsService.updateJob(role, id, dto);
  }

  @ApiOperation({ summary: 'Delete a job' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteJob(
    @GetUser('role') role: string,
    @Param('id', ParseIntPipe) deleteId: number,
  ) {
    return this.jobsService.deleteJob(role, deleteId);
  }

  @ApiOperation({ summary: 'Get job by ID' })
  @Get('id=:id')
  getJobById(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findJobById(id);
  }

  @ApiOperation({ summary: 'Search job by name' })
  @Get('search')
  getJobByName(@Query() dto: SearchDto) {
    let { item, page, name } = dto;
    return this.jobsService.findJobByName(item, page, name);
  }
}
