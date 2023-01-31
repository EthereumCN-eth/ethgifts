import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  Res,
  Body,
} from '@nestjs/common';
import { RSSFeedService } from './rss.service';

@Controller('rss')
export class RSSFeedControl {
  constructor(private readonly RssService: RSSFeedService) {}

  @Get()
  async xmlResponse(@Res() res) {
    const RSSFeed = await this.RssService.RSSFeed();

    res.set('Content-Type', 'text/xml');
    res.send(RSSFeed);
  }
}
