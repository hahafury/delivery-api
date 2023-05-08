import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  public findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
