import { IsEthAddressPipe } from './../shared/pipes/isEthAddress.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SbtService } from './sbt.service';
import { FindSbtsByAddressAndSbtIdDto } from './dto/find-sbts-by-address-and-id.dto';

@Controller('sbt')
export class SbtController {
  constructor(private readonly sbtService: SbtService) {}

  @Post('/address/id')
  findSBTRecordsByETHAddressAndSbtId(
    @Body('ethAddress', new IsEthAddressPipe()) ethAddress: string,
    @Body('id', new ParseIntPipe()) sbtId: number,
  ) {
    return this.sbtService.findSBTRecordsByETHAddressAndSbtId({
      ethAddress,
      sbtId,
    } as FindSbtsByAddressAndSbtIdDto);
  }
}
