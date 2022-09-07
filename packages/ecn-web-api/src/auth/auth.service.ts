import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { JwtService } from '@nestjs/jwt';
import { generateNonce, SiweMessage } from 'siwe';
// import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly profileService: ProfilesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async nonce() {
    const nonce = generateNonce();
    // await this.cacheManager.set(ethAddress, nonce, { ttl: 60 * 2 });
    return {
      success: true,
      nonce,
    };
  }

  async verify({ message, signature }: { message: string; signature: string }) {
    try {
      const siweMessage = new SiweMessage(message);
      const fields = await siweMessage.verify({ signature });
      const {
        success,
        data: { address: ethAddress },
      } = fields;
      if (success) {
        const payload = { ethAddress: ethAddress?.toLowerCase() };
        // const profile = await this.profileService.findOne(payload);
        return {
          success: true,
          access_token: this.jwtService.sign(payload),
          // profile,
        };
      } else {
        return {
          success: false,
          access_token: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        access_token: null,
      };
    }
  }
}
