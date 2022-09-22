import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cache } from 'cache-manager';
import { Item, Token } from './interfaces/gallery.interface';
import { NFT, Poap, SBTContractType } from '@prisma/client';
import { array } from 'yup';

@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // private items: Item,
  ) {}

  async acquireData() {
    const gallery = await this.prisma.gallery.findMany();
    const nfts = await this.prisma.nFT.findMany();
    const sbts = await this.prisma.sBTContractType.findMany();
    const poaps = await this.prisma.poap.findMany();

    const items = gallery.reduce((acc: Item, item, index) => {
      const nft =
        item.typeName === 'nft'
          ? nfts.find((element) => element.id === item.typeId)
          : null;
      const sbt =
        item.typeName == 'sbt'
          ? sbts.find((element) => element.id === item.typeId)
          : null;
      const poap =
        item.typeName == 'poap'
          ? poaps.find((element) => element.id === item.typeId)
          : null;
      const status =
        item.eventStartTime > Date.now()
          ? 'coming soon'
          : Date.now() > item.eventStartTime + item.eventDuration
          ? 'expired'
          : 'on going';

      const tokenInfo = this.currentTokenInfo(nft, sbt, poap);

      acc[index + 1] = {
        typeName: item.typeName,
        typeId: item.typeId,
        startTime: item.eventStartTime,
        tokenName: tokenInfo.tokenName,
        imageLinks: tokenInfo.tokenImageLinks,
        videoLinks:
          tokenInfo.tokenVideoLinks.length !== 0
            ? tokenInfo.tokenVideoLinks
            : null,
        status: status,
        tags: item.tags.length !== 0 ? item.tags : null,
        SBTLevel: tokenInfo.sbtLevels,
        chainId: tokenInfo.chainId,
        contractAddress: tokenInfo.contractAddress,
        eventIds: tokenInfo.eventId,
      };
      return acc;
    }, {});

    return Object.values(items);
  }

  currentTokenInfo(nftItem: NFT, sbtItem: SBTContractType, poapItem: Poap) {
    // console.log(nftItem);
    const tokenInfo: Token = {
      tokenName: nftItem?.name || sbtItem?.name || poapItem?.name,
      tokenImageLinks:
        nftItem?.imageLinks || sbtItem?.imageLinks || poapItem?.imageLinks,
      tokenVideoLinks:
        nftItem?.videoLinks || sbtItem?.videoLinks || poapItem?.videoLinks,
      chainId: nftItem?.chainId || sbtItem?.chainId || poapItem?.chainId,
      contractAddress:
        nftItem !== null
          ? nftItem.contractAddress
          : null || sbtItem !== null
          ? sbtItem.contractAddress
          : null,
      sbtLevels: sbtItem !== null ? sbtItem.countLevel : null,
      eventId: poapItem !== null ? poapItem.eventId : null,
    };

    return tokenInfo;
  }
}
