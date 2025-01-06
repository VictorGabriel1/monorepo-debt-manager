import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'debt-manager-dev',
  password: 'debt-manager-pass2025',
  database: 'debt-manager',
  entities: [__dirname + '/modules/**/entities/*.entity.{ts,js}'],
  synchronize: true,
};
