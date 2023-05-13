import { BadRequestException } from '@nestjs/common';

export class ProductAlreadyInFavoriteListException extends BadRequestException {
  constructor() {
    super('Product is already in favorite list!');
  }
}
