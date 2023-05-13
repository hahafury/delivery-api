import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindOptionsWhere,
  UpdateResult,
  FindOptionsOrder,
} from 'typeorm';
import { Pagination, PaginationOptions } from '@app/common/helpers/pagination';
import { UserEntity } from '@app/modules/user/entities';
import { ProductNotFoundException } from './exceptions';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductEntity } from './entities';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  public async paginate(
    options: PaginationOptions,
    where?: FindOptionsWhere<ProductEntity>,
    order?: FindOptionsOrder<ProductEntity>,
  ): Promise<Pagination<ProductEntity>> {
    console.log(order);
    const [results, total] = await this.productRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      where: where,
      order: order,
    });

    return new Pagination<ProductEntity>({
      results: results,
      total: total,
    });
  }

  public findOneBy(
    where: FindOptionsWhere<ProductEntity>,
  ): Promise<ProductEntity> {
    return this.productRepository.findOneBy(where);
  }

  public create(data: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save(data);
  }

  public update(
    where: FindOptionsWhere<ProductEntity>,
    data: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productRepository.update(where, data);
  }

  public delete(where: FindOptionsWhere<ProductEntity>): Promise<DeleteResult> {
    return this.productRepository.delete(where);
  }

  public async addToUserFavorites(
    productId: string,
    user: UserEntity,
  ): Promise<void> {
    const product: ProductEntity = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        favoriteByUsers: true,
      },
    });
    if (!product) {
      throw new ProductNotFoundException();
    }
    const isAlreadyInUserFavorites: boolean = product.favoriteByUsers.some(
      (_user) => user.id === _user.id,
    );
    if (isAlreadyInUserFavorites) {
      throw new BadRequestException('Product is already in favorite list!');
    }
    product.favoriteByUsers.push(user);
    await this.productRepository.save(product);
  }
}
