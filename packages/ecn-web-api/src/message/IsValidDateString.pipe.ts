import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isMatch, format } from 'date-fns';

// const eth = /^(0x)[0-9a-f]{40}$/i;

const throwInvalidateException = () => {
  throw new BadRequestException({
    sucess: false,
    error: 'Validation failed',
  });
};

@Injectable()
export class IsValidDateStringPipe implements PipeTransform<any, string> {
  transform(value: any): string {
    // console.log('value', value);
    if (typeof value === 'undefined') {
      // console.log('value', value);
      return format(new Date(), 'yyyy-MM');
    }
    const isString = typeof value === 'string';
    if (!isString) {
      throwInvalidateException();
    }

    try {
      const isCorrect = isMatch(value, 'yyyy-MM');

      if (!isCorrect) {
        throwInvalidateException();
      }
      return value;
    } catch (error) {
      throwInvalidateException();
    }
  }
}
