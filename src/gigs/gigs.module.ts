import { Module } from '@nestjs/common';
import { GigsController } from './gigs.controller';
import { GigsService } from './gigs.service';

@Module({
  controllers: [GigsController],
  providers: [GigsService]
})
export class GigsModule {}
