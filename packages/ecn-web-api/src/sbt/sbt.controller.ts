import { IsEthAddressPipe } from '../shared/pipes/IsEthAddress.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SbtService } from './sbt.service';
import { FindSbtsByAddressAndSbtIdDto } from './dto/find-sbts-by-address-and-id.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUserInterceptor } from '../shared/interceptors/AuthUser.interceptor';

@Controller('sbt')
export class SbtController {
  constructor(private readonly sbtService: SbtService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  @Post('/address/id')
  findSBTRecordsByETHAddressAndSbtId(
    @Body('ethAddress', new IsEthAddressPipe()) ethAddress: string,
    @Body('id', new ParseIntPipe()) sbtId: number,
    @Body('jwtEthAddress') jwtEthAddress: string,
  ) {
    return this.sbtService.findSBTRecordsByETHAddressAndSbtId({
      ethAddress,
      sbtId,
      jwtEthAddress,
    } as FindSbtsByAddressAndSbtIdDto);
  }
}
