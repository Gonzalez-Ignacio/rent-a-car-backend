import { Module } from '@nestjs/common';
import { DocumentService } from './domain/service/document.service';
import { DocumentController } from './interface/document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Document } from './domain/entity/document.entity';
import { DocumentRepository } from './infraestructure/document.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), UserModule],
  providers: [DocumentService, DocumentRepository],
  controllers: [DocumentController],
})
export class DocumentModule {}
