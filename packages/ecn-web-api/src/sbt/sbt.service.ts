import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { FindSbtsByAddressAndSbtIdDto } from './dto/find-sbts-by-address-and-id.dto';

@Injectable()
export class SbtService {
  constructor(private userService: UserService) {}

  async findSBTRecordsByETHAddressAndSbtId({
    ethAddress,
    sbtId,
  }: FindSbtsByAddressAndSbtIdDto) {
    try {
      const user = await this.userService.findSBTRecordsByETHAddressAndSbtId({
        ethAddress,
        sbtId,
      });
      // console.log('user', user);
      if (user) {
        return {
          success: true,
          user,
          records: user.sbtSignatureRecords,
        };
      } else {
        return {
          success: true,
          user: null,
          records: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        user: null,
        records: null,
        error: e,
      };
    }
  }
}
