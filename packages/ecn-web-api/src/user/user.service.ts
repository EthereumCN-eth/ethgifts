import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { PrismaClient, Prisma, User } from '@prisma/client';
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
    const resp = await this.prisma.$transaction(
      async (
        prisma: PrismaClient<
          Prisma.PrismaClientOptions,
          never,
          Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
        >,
      ) => {
        const [levels, expressCountFromUser] = await Promise.all([
          this.prisma.sBTContractType.findUnique({
            where: {
              id: sbtId,
            },
            select: {
              countLevel: true,
            },
          }),
          this.prisma.user.findUnique({
            where: {
              ethAddress,
            },
            select: {
              expressCount: true,
            },
          }),
        ]);

        const levelFilterCondition = [
          ...levels.countLevel,
          expressCountFromUser.expressCount,
        ].map((levelNumber) => ({
          signaturePayload: {
            expressCount: levelNumber,
          },
        }));
        const user = await this.prisma.user.findUnique({
          where: {
            ethAddress,
          },
          select: {
            expressCount: true,
            sbtSignatureRecords: {
              where: {
                sbtContractTypeId: sbtId,
                OR: levelFilterCondition,
              },
              include: {
                signaturePayload: true,
              },
              orderBy: {
                signaturePayload: {
                  expressCount: 'desc',
                },
              },
            },
          },
        });
        return user;
      },
    );
    return resp;
  }
}
