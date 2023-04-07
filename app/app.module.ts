import { Module } from '@nestjs/common';
import { UserModule } from '@app/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from '@app/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...DATABASE_CONFIG }),
    UserModule,
  ],
})
export class AppModule {}
