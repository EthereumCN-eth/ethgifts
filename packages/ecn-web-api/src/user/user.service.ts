import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findSBTRecordsByETHAddressAndSbtId({
    ethAddress,
    sbtId,
  }: {
    ethAddress: string;
    sbtId: number;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        ethAddress,
      },
      select: {
        expressCount: true,
        sbtSignatureRecords: {
          where: {
            sbtContractTypeId: sbtId,
          },
        },
      },
    });
    return user;
  }
}
