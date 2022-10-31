import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cache } from 'cache-manager';
import {
  GalleryItem,
  BaseItem,
  SBTItem,
  NFTItem,
  PoapItem,
  EventItem,
} from './interfaces/gallery.interface';
import { GalleryItemBase, NFT, Poap, SBTContractType } from '@prisma/client';
// import { NFT, Poap, SBTContractType } from '@prisma/client';
// import { array } from 'yup';

const expandSBTItems = (
  sbts: (SBTContractType & {
    galleryItemBase: GalleryItemBase;
  })[],
): (SBTContractType & {
  galleryItemBase: GalleryItemBase;
} & { currentLevel: number; currentIndex: number })[] => {
  return sbts.reduce((acc, item) => {
    const items = item.countLevel.map((level, ind) => {
      return {
        ...item,
        currentLevel: level,
        currentIndex: ind,
        galleryItemBase: {
          ...item.galleryItemBase,
          name: item.galleryItemBase.itemText[ind],
          coverLink: item.galleryItemBase.imageLinks[ind],
        },
      };
    });
    return [...acc, ...items];
  }, []);
};

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
        nftDeliveryData: true,
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

    console.log(...expandSBTItems(sbts));

    const galleryItems = [...nfts, ...expandSBTItems(sbts), ...poaps].map(
      (item) => {
        let additionalProps:
          | Omit<SBTItem, keyof BaseItem>
          | Omit<NFTItem, keyof BaseItem>
          | Omit<PoapItem, keyof BaseItem>;
        if ('countLevel' in item) {
          const {
            issuerAddress,
            contractAddress,
            countLevel: SBTLevel,
            galleryItemBase: { imageLinks: artworks },
            currentLevel,
            currentIndex,

            // galleryItemBase: { galleryItemType: typeName },
          } = item;
          additionalProps = {
            currentLevel,
            issuerAddress,
            contractAddress,
            SBTLevel,
            artworks,
            typeName: 'sbt',
            currentIndex,
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
            nftAppType,
            nftDeliveryData,

            // galleryItemBase: { galleryItemType: typeName },
          } = item;
          additionalProps = {
            nftDeliveryData,
            nftAppType,
            contractAddress,
            typeName: 'nft',
          };
        }
        const {
          galleryItemBase: {
            eventDuration,
            eventStartTime,
            tags,
            itemText,
            imageLinks,
            videoLinks,
            chainId,
            name,
            tokenType,
            tokenId,
            onShelf,
            coverLink,
            infoDetail,
            mainViewType,
          },
          id,
        } = item;

        let timeProps: EventItem;
        if (eventDuration && eventStartTime) {
          timeProps = {
            endTime: eventDuration + eventStartTime,
            startTime: eventStartTime,
            status:
              eventStartTime > Date.now()
                ? 'coming soon'
                : Date.now() > eventStartTime + eventDuration
                ? null
                : 'ongoing',
          };
        } else if (eventStartTime && !eventDuration) {
          timeProps = {
            endTime: Infinity,
            startTime: eventStartTime,
            status: eventStartTime > Date.now() ? 'coming soon' : 'ongoing',
          };
        } else if (!eventStartTime && !eventDuration) {
          timeProps = {
            endTime: Infinity,
            startTime: 0,
            status: 'ongoing',
          };
        } else {
          // never
          timeProps = {
            endTime: Infinity,
            startTime: 0,
            status: 'ongoing',
          };
        }

        const commonProps: BaseItem = {
          ...timeProps,
          tags,
          itemText,
          imageLinks,
          videoLinks,
          chainId,
          name,
          id,
          tokenType,
          tokenId,
          onShelf,
          coverLink,
          infoDetail,
          mainViewType,
        };

        return {
          ...additionalProps,
          ...commonProps,
        };
      },
    );

    const sortedItems = galleryItems.sort((x, y) => {
      return y.startTime - x.startTime;
    });

    await this.cacheManager.set(GALLERY_CACHE_KEY, sortedItems, { ttl: 900 });
    return sortedItems;
  }
}
