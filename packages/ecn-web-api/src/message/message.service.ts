import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { PrismaClient, Prisma, User } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}
  async findLatestByDate() {
    const minmaxDate = await this.prisma.expressMessage.aggregate({
      _max: {
        verifiedAt: true,
      },
      _min: {
        verifiedAt: true,
      },
      _count: {
        id: true,
      },
    });

    return minmaxDate;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
