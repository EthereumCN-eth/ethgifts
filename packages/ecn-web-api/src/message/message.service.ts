import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { PrismaClient, Prisma, User } from '@prisma/client';
import {
  startOfMonth,
  format,
  endOfMonth,
  min,
  max,
  add,
  isBefore,
  sub,
  isAfter,
  closestTo,
  formatISO,
  isSameMonth,
} from 'date-fns';
@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}
  async findMessagesByDate({ datestring }: { datestring: string }) {
    const minmaxDate = await this.prisma.expressMessage.aggregate({
      _max: {
        verifiedAt: true,
      },
      _min: {
        verifiedAt: true,
      },
      // _count: {
      //   id: true,
      // },
    });
    const { _max, _min } = minmaxDate;
    const currentDate = _max?.verifiedAt
      ? max([min([_max.verifiedAt, new Date(datestring)]), _min.verifiedAt])
      : new Date(datestring);

    const nextMonth = add(currentDate, {
      months: 1,
    });
    // );
    const previousMonth = sub(currentDate, {
      months: 1,
    });
    const messagesOfMonth = await this.prisma.expressMessage.findMany({
      where: {
        verifiedAt: {
          lte: endOfMonth(nextMonth),
          gte: startOfMonth(previousMonth),
        },
      },
      include: {
        user: {
          select: {
            name: true,
            discordAvatar: true,
          },
        },
      },
      orderBy: {
        verifiedAt: 'asc',
      },
    });
    const datesOfMsgs = messagesOfMonth.map((v) =>
      formatISO(new Date(v.verifiedAt), { representation: 'date' }),
    );
    const lateDayOfPre = max(
      datesOfMsgs
        .map((s) => new Date(s))
        .filter((d) => isSameMonth(startOfMonth(previousMonth), d)),
    );
    const firstDayOfNext = min(
      datesOfMsgs
        .map((s) => new Date(s))
        .filter((d) => isSameMonth(endOfMonth(nextMonth), d)),
    );

    const maxDate = _max?.verifiedAt;
    const minDate = _min?.verifiedAt;

    // );
    // const nextMonthDate = isBefore(nextMonth, maxDate) ? nextMonth : null;
    // const previousMonthDate = isAfter(previousMonth, minDate)
    // ? previousMonth
    // : null;
    return {
      navInfo: {
        maxDate,
        minDate,
        currentDate: closestTo(
          new Date(),
          messagesOfMonth.map((m) => m.verifiedAt),
        ),
        nextMonthDate: lateDayOfPre,
        previousMonthDate: lateDayOfPre,
      },

      messagesOfMonth,
    };
    // const minmaxDate = await this.prisma.expressMessage.aggregate({
    //   _max: {
    //     verifiedAt: true,
    //   },
    //   _min: {
    //     verifiedAt: true,
    //   },
    //   _count: {
    //     id: true,
    //   },
    // });

    // return minmaxDate;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
