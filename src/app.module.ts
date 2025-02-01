import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from './modules/document/document.module';
import { getDbConfig } from './../db.config';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDbConfig()),
    UserModule,
    DocumentModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
