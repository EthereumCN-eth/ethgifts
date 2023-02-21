import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { sub, max, min, endOfDay, startOfDay } from 'date-fns';
import { ExpressMessage, User } from '@prisma/client';

@Injectable()
export class RSSFeedService {
  constructor(private readonly prisma: PrismaService) {}

  async queryLastDayRSS() {
    // const currentDate = new Date();

    const minmaxDate = await this.prisma.expressMessage.aggregate({
      _max: {
        verifiedAt: true,
      },
      _min: {
        verifiedAt: true,
      },
    });

    const currentDate = minmaxDate._max?.verifiedAt
      ? max([
          min([minmaxDate._max.verifiedAt, new Date()]),
          minmaxDate._min.verifiedAt,
        ])
      : new Date();

    let message: (ExpressMessage & {
      user: {
        name: string;
      };
    })[] = [];
    let lastDay: Date = currentDate;
    do {
      lastDay = sub(lastDay, { days: 1 });
      message = await this.prisma.expressMessage.findMany({
        where: {
          verifiedAt: {
            lte: endOfDay(lastDay),
            gte: startOfDay(lastDay),
          },
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          verifiedAt: 'asc',
        },
      });
    } while (message.length === 0);

    const express: Express[] = message.map((ex) => {
      return {
        description: ex.expressMessage,
        link: ex.expressUrl,
        userName: ex.user.name,
        verifiedAt: ex.verifiedAt,
      };
    });
    return express;
  }

  buildRssItems(messages: Express[]) {
    const items = messages.map((msg) => {
      const parseUrl = msg.link
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace("'", '&apos;');
      return `
      <item>
          <title>${msg.description}</title>
          <link>${parseUrl}</link>
          <author>${msg.userName}</author>
          <pubDate>${new Date(msg.verifiedAt).toUTCString()}</pubDate>
      </item>`;
    });
    // return items;
    return items.reduce((acc, item): string => {
      return acc + item;
    });
  }

  async RSSFeed() {
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <atom:link href="https://test.api.ethgifts.com/api/rss.html" rel="self" type="application/rss+xml" />
    <channel>
      <title>ECN Express</title>
      <link>https://www.ethereum.cn/</link>
      <description>E 群誌是 ECN 推出的一个社区协作编辑企划，鼓励社区成员把自己看到的最新、重要、有趣的以太坊相关信息在 ECN discord 分享和讨论，ECN 把当天的消息汇总于此。</description>
      ${this.buildRssItems(await this.queryLastDayRSS())}
    </channel>
    </rss>`;

    return rssFeed;
  }
}

type Express = {
  description: string;
  link: string;
  userName: string;
  verifiedAt: Date;
};
