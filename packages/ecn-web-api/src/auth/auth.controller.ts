import { Body, Controller, Post, Type } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { isEthAddressPipe } from '../shared/pipes/isEthAddress.pipe';
import { AuthService } from './auth.service';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      properties: {
        ethAddress: { type: 'string' },
      },
    },
  })
  @Post('nonce')
  async nonce(@Body('ethAddress', new isEthAddressPipe()) ethAddress: string) {
    return this.authService.nonce({ ethAddress });
  }

  @Post('verify')
  async verify(@Body() verifyDto: VerifyDto) {
    return this.authService.verify(verifyDto);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('profile')
  //   getProfile(@Request() req) {
  //     return req.user;
  //   }
}
