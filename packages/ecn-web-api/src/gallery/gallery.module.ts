// src/prisma/prisma.module.ts

import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { PrismaService } from '../prisma/prisma.service';
import { GalleryController } from './gallery.controller';

@Module({
  controllers: [GalleryController],
  providers: [PrismaService, GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
