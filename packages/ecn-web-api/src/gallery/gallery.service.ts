import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cache } from 'cache-manager';
import { GalleryItem } from './interfaces/gallery.interface';
// import { NFT, Poap, SBTContractType } from '@prisma/client';
// import { array } from 'yup';

const GALLERY_CACHE_KEY = 'GALLERY_CACHE_KEY';
@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // private items: Item,
  ) {}

  async acquireGeneralData() {
    const cachedItems = await this.cacheManager.get<GalleryItem[]>(
      GALLERY_CACHE_KEY,
    );
    if (cachedItems) {
      return cachedItems;
    }
    // console.log('no cache');
    // no cache
    //
    const gallery = await this.prisma.gallery.findMany();
    const nfts = await this.prisma.nFT.findMany();
    const sbts = await this.prisma.sBTContractType.findMany();
    const poaps = await this.prisma.poap.findMany();

    // console.log(gallery);
    const galleryItems = await Promise.all(
      gallery.map(async (entry) => {
        let item;
        if (entry.typeName === 'nft') {
          item = nfts.find((element) => element.id === entry.typeId);
        } else if (entry.typeName === 'poap') {
          item = poaps.find((element) => element.id === entry.typeId);
        } else if (entry.typeName === 'sbt') {
          item = sbts.find((element) => element.id === entry.typeId);
        } else {
          //  not gonna happen if database inputed correctly
          item = {};
        }

        const { contractAddress, imageLinks, videoLinks, chainId, name } = item;
        //
        const { eventStartTime, eventDuration, typeName, tags } = entry;
        // console.log('eventStartTime', eventStartTime);
        return {
          name,
          contractAddress,
          typeName,
          imageLinks,
          videoLinks,
          chainId,
          tags,
          startTime: eventStartTime,
          endTime: eventStartTime + eventDuration,
          status:
            eventStartTime > Date.now()
              ? 'coming soon'
              : Date.now() > eventStartTime + eventDuration
              ? null
              : 'on going',
        } as GalleryItem;
      }),
    );
    await this.cacheManager.set(GALLERY_CACHE_KEY, galleryItems, { ttl: 300 });
    return galleryItems;
  }
}
