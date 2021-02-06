import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any): any {
    if (!this.isValidObjectId(value))
      throw new BadRequestException(`${value} is an invalid id`);

    return value;
  }

  isValidObjectId(value: any): boolean {
    return Types.ObjectId.isValid(value);
  }
}
