import { Module } from '@nestjs/common';
import { RSSFeedService } from './rss.service';
import { RSSFeedControl } from './rss.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RSSFeedControl],
  providers: [RSSFeedService, PrismaService],
})
export class RSSFeedModule {}
