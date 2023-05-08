import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  Pagination,
  PAGINATION_DEFAULT_PROPERTIES,
} from '@app/common/helpers/pagination';
import { UserRoles } from '@app/modules/user/decorators';
import { UserRole } from '@app/modules/user/enums';
import { OnlyAuthorizedGuard, UserRoleGuard } from '@app/modules/user/guards';
import { ProductEntity } from './entities';
import {
  CreateProductDto,
  ProductIndexQueryDto,
  UpdateProductDto,
} from './dto';
import { ProductService } from './product.service';

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
    return this.productService.findOneBy({ id: id });
  }

  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  @Post()
  public create(@Body() data: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(data);
  }

  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productService.update({ id: id }, data);
  }

  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  @Delete(':id')
  public delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.delete({ id: id });
  }
}
