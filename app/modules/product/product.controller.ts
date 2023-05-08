import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  Pagination,
  PAGINATION_DEFAULT_PROPERTIES,
} from '@app/common/helpers/pagination';
import { ProductEntity } from '@app/modules/product/entities/product.entity';
import { ProductIndexQueryDto } from './dto/product-index-query.dto';
import { ProductService } from './product.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  public index(
    @Query() query: ProductIndexQueryDto,
  ): Promise<Pagination<ProductEntity>> {
    return this.productService.paginate(
      {
        limit: query.limit
          ? parseInt(query.limit)
          : PAGINATION_DEFAULT_PROPERTIES.LIMIT,
        page: query.page
          ? parseInt(query.page)
          : PAGINATION_DEFAULT_PROPERTIES.PAGE,
      },
      {
        category: {
          id: query.category,
        },
      },
    );
  }

  @Get(':id')
  public show(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findById(id);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() data: QueryDeepPartialEntity<ProductEntity>,
  ): Promise<UpdateResult> {
    return this.productService.update({ id: id }, data);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.delete({ id: id });
  }
}
