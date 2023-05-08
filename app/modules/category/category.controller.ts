import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { UserRoles } from '@app/modules/user/decorators';
import { UserRole } from '@app/modules/user/enums';
import { OnlyAuthorizedGuard, UserRoleGuard } from '@app/modules/user/guards';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  public index(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  public show(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.findOneBy({ id: id });
  }

  @Post()
  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  public create(@Body() data: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(data);
  }

  @Put(':id')
  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  public update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryService.update({ id: id }, data);
  }

  @Delete(':id')
  @UserRoles(UserRole.ADMIN)
  @UseGuards(OnlyAuthorizedGuard, UserRoleGuard)
  public delete(@Param(':id') id: string): Promise<DeleteResult> {
    return this.categoryService.delete({ id: id });
  }
}
