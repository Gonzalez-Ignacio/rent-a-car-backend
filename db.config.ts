import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export function getDbConfig() {
  if (process.env.NODE_ENV === 'development') {
    const config: TypeOrmModuleOptions = {
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
    return config;
  }

  if (process.env.NODE_ENV === 'test') {
    const config: TypeOrmModuleOptions = {
      type: 'better-sqlite3',
      database: `./data/${Math.random()}.sqlite`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };

    return config;
  }
}
