import {
  PipeTransform,
  Injectable,
  // ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
// import * as yup from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: any) {}

  async transform(value: any) {
    try {
      const _result = await this.schema.validate(value);
    } catch (error) {
      if (error) {
        const errMsg =
          error && error.errors && error.errors[0]
            ? error.errors[0]
            : 'validation error';
        throw new BadRequestException(errMsg);
      }
    }

    return value;
  }
}
