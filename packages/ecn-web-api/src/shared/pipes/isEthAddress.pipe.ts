import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

const eth = /^(0x)[0-9a-f]{40}$/i;

@Injectable()
export class isEthAddressPipe implements PipeTransform<any, string> {
  transform(value: any): string {
    // const val = parseInt(value, 10);
    console.log('val', value);
    const isString = typeof value === 'string' || value instanceof String;
    if (!isString || !eth.test(value.trim())) {
      throw new BadRequestException('Validation failed');
    }
    return value.toLocaleUpperCase();
  }
}
