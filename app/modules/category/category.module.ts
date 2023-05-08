import { Module } from '@nestjs/common';
import { UserModule } from '@app/modules/user/user.module';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';

@Module({
  imports: [UserModule],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
