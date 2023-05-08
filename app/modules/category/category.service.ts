import { Injectable } from '@nestjs/common';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  public findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  public findOneBy(
    where: FindOptionsWhere<CategoryEntity>,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.findOneBy(where);
  }

  public create(data: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryRepository.save(data);
  }

  public update(
    where: FindOptionsWhere<CategoryEntity>,
    data: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryRepository.update(where, data);
  }

  public delete(
    where: FindOptionsWhere<CategoryEntity>,
  ): Promise<DeleteResult> {
    return this.categoryRepository.delete(where);
  }
}
