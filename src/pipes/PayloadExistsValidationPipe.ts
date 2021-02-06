import { BadRequestException, PipeTransform } from '@nestjs/common';
import _ from 'lodash';

export class PayloadExistsValidationPipe implements PipeTransform {
  transform(payload: any): any {
    if (_.isEmpty(payload))
      throw new BadRequestException('Payload should not be empty');

    return payload;
  }
}
