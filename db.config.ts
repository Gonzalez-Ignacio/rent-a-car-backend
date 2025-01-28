import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export function getDbConfig() {
  if (process.env.NODE_ENV === 'development') {
    const config: TypeOrmModuleOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'user_password',
      database: 'my_database',
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
