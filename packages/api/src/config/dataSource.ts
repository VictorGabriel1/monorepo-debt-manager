import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    database: configService.get<string>('DB_NAME'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    logging: true,
  };
};

//required to start process.env
ConfigModule.forRoot();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'debt-manager-dev',
  password: process.env.DB_PASSWORD || 'debt-manager-pass2025',
  database: process.env.DB_NAME || 'debt-manager',
  entities: [__dirname + '/**/entity/*.entity.{ts,js}'],
  synchronize: false,
};

const dataSource = new DataSource(options);

export default dataSource;
