import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cache } from 'cache-manager';
import { NFTItem, PoapItem, SBTItem } from './interfaces/gallery.interface';
// import { NFT, Poap, SBTContractType } from '@prisma/client';
// import { array } from 'yup';

@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // private items: Item,
  ) {}

  async acquireGeneralData() {
    const gallery = await this.prisma.gallery.findMany();
    const nfts = await this.prisma.nFT.findMany();
    const sbts = await this.prisma.sBTContractType.findMany();
    const poaps = await this.prisma.poap.findMany();

    return await Promise.all(
      gallery.map(async (entry) => {
        if (entry.typeName === 'nft') {
          const nft = nfts.find((element) => element.id === entry.typeId);

          const item: NFTItem = {
            contractAddress: nft.contractAddress,
            typeName: 'nft',
            tokenName: nft.name,
            imgaeLinks: nft.imageLinks,
            videoLinks: nft.videoLinks,
            chainId: nft.chainId,
            tags: entry.tags,
            startTime: entry.eventStartTime,
            endTime: entry.eventStartTime + entry.eventDuration,
            status:
              entry.eventStartTime > Date.now()
                ? 'coming soon'
                : Date.now() > entry.eventStartTime + entry.eventDuration
                ? 'expired'
                : 'on going',
          };

          return item;
        }
        if (entry.typeName === 'poap') {
          const poap = poaps.find((element) => element.id === entry.typeId);

          const item: PoapItem = {
            eventId: poap.eventId,
            typeName: 'poap',
            tokenName: poap.name,
            imgaeLinks: poap.imageLinks,
            videoLinks: poap.videoLinks,
            chainId: poap.chainId,
            tags: entry.tags,
            startTime: entry.eventStartTime,
            endTime: entry.eventStartTime + entry.eventDuration,
            status:
              entry.eventStartTime > Date.now()
                ? 'coming soon'
                : Date.now() > entry.eventStartTime + entry.eventDuration
                ? 'expired'
                : 'on going',
          };

          return item;
        }

        if (entry.typeName === 'sbt') {
          const sbt = sbts.find((element) => element.id === entry.typeId);

          const item: SBTItem = {
            SBTLevel: sbt.countLevel,
            typeName: 'sbt',
            tokenName: sbt.name,
            imgaeLinks: sbt.imageLinks,
            videoLinks: sbt.videoLinks,
            chainId: sbt.chainId,
            tags: entry.tags,
            startTime: entry.eventStartTime,
            endTime: entry.eventStartTime + entry.eventDuration,
            status:
              entry.eventStartTime > Date.now()
                ? 'coming soon'
                : Date.now() > entry.eventStartTime + entry.eventDuration
                ? 'expired'
                : 'on going',
          };

          return item;
        }
      }),
    );
  }
}
