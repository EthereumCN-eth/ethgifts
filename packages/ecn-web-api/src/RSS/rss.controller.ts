import { Controller, Get, Query, DefaultValuePipe } from '@nestjs/common';
import { RSSFeedService } from './rss.service';

@Controller('RSS')
export class RSSFeedControl {
  constructor(private readonly RssService: RSSFeedService) {}

  // @Post()
  // create(@Body() createMessageDto: CreateMessageDto) {
  //   return this.messageService.create(createMessageDto);
  // }
  @Get()
  async RSSFeed() {
    try {
      const RSSFeed = await this.RssService.RSSFeed();
      return {
        success: true,
        RSSFeed,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        items: null,
      };
    }
  }
}
