import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  Body,
  Post,
  UseGuards,
  Put,
  Patch,
} from '@nestjs/common';
import {
  Between,
  DeleteResult,
  LessThan,
  MoreThan,
  UpdateResult,
} from 'typeorm';
import {
  Pagination,
  PAGINATION_DEFAULT_PROPERTIES,
} from '@app/common/helpers/pagination';
import { CurrentUser, UserRoles } from '@app/modules/user/decorators';
import { UserEntity } from '@app/modules/user/entities';
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
  constructor(private readonly productService: ProductService) {}

  @Get()
  public index(
    @Query() query: ProductIndexQueryDto,
  ): Promise<Pagination<ProductEntity>> {
    return this.productService.paginate(
      {
        limit: query.limit ?? PAGINATION_DEFAULT_PROPERTIES.LIMIT,
        page: query.page ?? PAGINATION_DEFAULT_PROPERTIES.PAGE,
      },
      {
        ...(query.category && { category: { id: query.category } }),
        ...(query.price && {
          price:
            (query.price.length > 2 &&
              Between(query.price[0], query.price[1])) ||
            (query.price[0] && MoreThan(query.price[0])) ||
            (query.price[1] && LessThan(query.price[1])),
        }),
      },
      query.orderBy,
    );
  }

  @Get(':id')
  public show(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findOneBy({ id: id });
  }

  @Post()
  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  public create(@Body() data: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(data);
  }

  @Put(':id')
  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  public update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productService.update({ id: id }, data);
  }

  @Delete(':id')
  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  public delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.delete({ id: id });
  }

  @Patch(':id/favorite')
  @UseGuards(OnlyAuthorizedGuard)
  public async addToFavorite(
    @Param('id') productId: string,
    @CurrentUser() user: UserEntity,
  ): Promise<any> {
    await this.productService.addToUserFavorites(productId, user);
  }
}
