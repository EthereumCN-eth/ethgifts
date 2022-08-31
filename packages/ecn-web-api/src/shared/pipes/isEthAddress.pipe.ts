import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { getAddress } from '@ethersproject/address';

// const eth = /^(0x)[0-9a-f]{40}$/i;

@Injectable()
export class isEthAddressPipe implements PipeTransform<any, string> {
  transform(value: any): string {
    // const isString = typeof value === 'string' || value instanceof String;
    // if (!isString || !eth.test(value.trim())) {
    //   throw new BadRequestException('Validation failed');
    // }
    // return value.toLocaleUpperCase();

    try {
      const checksumAddr = getAddress(value);
      return checksumAddr.toLocaleLowerCase();
    } catch (error) {
      throw new BadRequestException({
        sucess: false,
        message: 'Validation failed',
      });
    }
  }
}
