import { Injectable } from '@nestjs/common';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { Pagination, PaginationOptions } from '@app/common/helpers/pagination';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductEntity } from './entities';
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
}
