import { Injectable } from '@nestjs/common';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Pagination, PaginationOptions } from '@app/common/helpers/pagination';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  public async paginate(
    options: PaginationOptions,
    where?: FindOptionsWhere<ProductEntity>,
  ): Promise<Pagination<ProductEntity>> {
    const [results, total] = await this.productRepository.findAndCount({
      take: options.limit,
      skip: options.page,
      where: where,
    });

    return new Pagination<ProductEntity>({
      results: results,
      total: total,
    });
  }

  public findById(id: string): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id: id });
  }

  public update(
    where: FindOptionsWhere<ProductEntity>,
    data: QueryDeepPartialEntity<ProductEntity>,
  ): Promise<UpdateResult> {
    return this.productRepository.update(where, data);
  }

  public delete(where: FindOptionsWhere<ProductEntity>): Promise<DeleteResult> {
    return this.productRepository.delete(where);
  }
}
