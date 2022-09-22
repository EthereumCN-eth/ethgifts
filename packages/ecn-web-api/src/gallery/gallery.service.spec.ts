// import { GalleryModule } from './gallery.module';
import { GalleryService } from './gallery.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';

describe('return a gallery item', () => {
  let cache: Cache;
  let prisma: PrismaService;

  it('return a valid item', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);

    const gallery = new GalleryService(prisma, cache);
    const items = await gallery.acquireData();

    console.log(items);
  });
});
