import { Module } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, CategoriesService],
})
export class JobsModule {}
