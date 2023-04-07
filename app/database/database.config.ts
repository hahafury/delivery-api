import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { UserCredentialsEntity } from '@app/modules/user/entities/user-credentials.entity';
import { UserRoleEntity } from '@app/modules/user/entities/user-role.entity';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [UserEntity, UserCredentialsEntity, UserRoleEntity],
  migrationsTableName: 'migration',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: process.env.NODE_ENV === 'production',
};
