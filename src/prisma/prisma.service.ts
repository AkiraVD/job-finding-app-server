import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { userData } from '../../test/testSuite';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.user.deleteMany(),
      this.categories.deleteMany(),
      this.jobs.deleteMany(),
      this.gigs.deleteMany(),
      this.orders.deleteMany(),
      this.comments.deleteMany(),
      this.user.createMany({ data: userData }),
    ]);
  }
}
