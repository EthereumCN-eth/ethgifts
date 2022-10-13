import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cache } from 'cache-manager';
import {
  GalleryItem,
  BaseItem,
  SBTItem,
  NFTItem,
  PoapItem,
} from './interfaces/gallery.interface';
import { GalleryItemBase, NFT, Poap, SBTContractType } from '@prisma/client';
// import { NFT, Poap, SBTContractType } from '@prisma/client';
// import { array } from 'yup';

const GALLERY_CACHE_KEY = 'GALLERY_CACHE_KEY';
@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // private items: Item,
  ) {}

  async acquireGeneralData(): Promise<GalleryItem[]> {
    const cachedItems = await this.cacheManager.get<GalleryItem[]>(
      GALLERY_CACHE_KEY,
    );
    if (cachedItems) {
      return cachedItems;
    }
    // console.log('no cache');
    // no cache
    //

    const nftsPromise = this.prisma.nFT.findMany({
      include: {
        galleryItemBase: true,
      },
    });
    const sbtsPromise = this.prisma.sBTContractType.findMany({
      include: {
        galleryItemBase: true,
      },
    });
    const poapsPromise = this.prisma.poap.findMany({
      include: {
        galleryItemBase: true,
      },
    });

    const [nfts, sbts, poaps] = await Promise.all([
      nftsPromise,
      sbtsPromise,
      poapsPromise,
    ]);

    const galleryItems = [...nfts, ...sbts, ...poaps].map((item) => {
      let additionalProps:
        | Omit<SBTItem, keyof BaseItem>
        | Omit<NFTItem, keyof BaseItem>
        | Omit<PoapItem, keyof BaseItem>;
      if ('countLevel' in item) {
        const {
          contractAddress,
          countLevel: SBTLevel,
          galleryItemBase: {
            imageLinks: [_, ...artworks],
          },
          // galleryItemBase: { galleryItemType: typeName },
        } = item;
        additionalProps = {
          contractAddress,
          SBTLevel,
          artworks,
          typeName: 'sbt',
        };
      } else if ('poapEventId' in item) {
        const {
          poapEventId: eventId,
          // galleryItemBase: { galleryItemType: typeName },
        } = item;
        additionalProps = {
          eventId,
          typeName: 'poap',
        };
      } else {
        const {
          contractAddress,

          // galleryItemBase: { galleryItemType: typeName },
        } = item;
        additionalProps = {
          contractAddress,
          typeName: 'nft',
        };
      }
      const {
        galleryItemBase: {
          eventDuration,
          eventStartTime,
          tags,

          imageLinks,
          videoLinks,
          chainId,
          name,
          tokenType,
          tokenId,
          onShelf,
        },
        id,
      } = item;

      const commonProps: BaseItem = {
        endTime: eventStartTime + eventDuration,
        startTime: eventStartTime,
        tags,
        imageLinks,
        videoLinks,
        chainId,
        name,
        id,
        tokenType,
        tokenId,
        onShelf,
        status:
          eventStartTime > Date.now()
            ? 'coming soon'
            : Date.now() > eventStartTime + eventDuration
            ? null
            : 'ongoing',
      };

      return {
        ...additionalProps,
        ...commonProps,
      };
    });

    await this.cacheManager.set(GALLERY_CACHE_KEY, galleryItems, { ttl: 300 });
    return galleryItems;
  }
}
