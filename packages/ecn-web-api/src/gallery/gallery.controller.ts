import { Body, Controller, Post, Type, Get } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { get } from 'http';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  //   @ApiBody({
  //     schema: {
  //       properties: {
  //         ethAddress: { type: 'string' },
  //       },
  //     },
  //   })

  @Get()
  async nonwallet() {
    console.log(await this.galleryService.acquireData());
  }
}
