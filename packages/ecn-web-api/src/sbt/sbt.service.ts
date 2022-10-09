import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { FindSbtsByAddressAndSbtIdDto } from './dto/find-sbts-by-address-and-id.dto';

@Injectable()
export class SbtService {
  constructor(private userService: UserService) {}

  async findSBTRecordsByETHAddressAndSbtId({
    ethAddress,
    sbtId,
    jwtEthAddress,
  }: FindSbtsByAddressAndSbtIdDto) {
    try {
      if (
        jwtEthAddress.toLowerCase().trim() !== ethAddress.toLowerCase().trim()
      ) {
        return {
          success: false,
          expressCount: null,
          records: null,
          error: Error('jwt address not matched'),
        };
      }
      const user = await this.userService.findSBTRecordsByETHAddressAndSbtId({
        ethAddress,
        sbtId,
      });
      // console.log('user', user);
      if (user) {
        return {
          success: true,
          expressCount: user.expressCount,
          records: user.sbtSignatureRecords,
        };
      } else {
        return {
          success: true,
          expressCount: null,
          records: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        expressCount: null,
        records: null,
        error: e,
      };
    }
  }
}
