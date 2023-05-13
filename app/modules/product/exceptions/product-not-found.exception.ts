import { BadRequestException } from '@nestjs/common';

export class ProductNotFoundException extends BadRequestException {
  constructor() {
    super('Product was not found!');
  }
}
