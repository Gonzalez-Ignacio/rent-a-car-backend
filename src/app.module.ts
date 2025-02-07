import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from './modules/document/document.module';
import { getDbConfig } from './../db.config';
import { CarModule } from './modules/car/car.module';
import { PictureModule } from './modules/picture/picture.module';
import { RentModule } from './modules/rent/rent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDbConfig()),
    UserModule,
    DocumentModule,
    CarModule,
    PictureModule,
    RentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
