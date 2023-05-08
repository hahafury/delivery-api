import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  public index(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }
}
