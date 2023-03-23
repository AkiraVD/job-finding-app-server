import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

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
    let data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        email: `testData${i}@gmail.com`,
        hash: 'test',
        fullname: `test ${i}`,
      });
    }
    return this.$transaction([
      this.user.deleteMany(),
      this.categories.deleteMany(),
      this.jobs.deleteMany(),
      this.gigs.deleteMany(),
      this.orders.deleteMany(),
      this.comments.deleteMany(),
      this.user.createMany({ data }),
    ]);
  }
}
