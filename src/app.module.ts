import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from './modules/document/document.module';
import { getDbConfig } from './../db.config';

@Module({
  imports: [TypeOrmModule.forRoot(getDbConfig()), UserModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
