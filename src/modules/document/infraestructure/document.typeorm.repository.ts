import { Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../domain/repository/document.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../domain/entity/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentRepository implements IDocumentRepository {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async findAllDocumentsByUser(userUuid: string): Promise<Document[]> {
    return await this.documentRepository.find({
      where: { user: { uuid: userUuid } },
    });
  }

  async save(document: Document): Promise<Document> {
    return await this.documentRepository.save(document);
  }

  async findByUrl(url: string): Promise<Document | null> {
    return await this.documentRepository.findOneBy({ url });
  }

  async findBySrc(src: string): Promise<Document | null> {
    return await this.documentRepository.findOneBy({ src });
  }

  async findOneDocument(
    userUuid: string,
    documentUuid: string,
  ): Promise<Document | null> {
    return await this.documentRepository.findOne({
      where: { user: { uuid: userUuid }, uuid: documentUuid },
    });
  }

  async update(document: Document): Promise<void> {
    await this.documentRepository.update(document.uuid, document);
  }

  async delete(documentId: string): Promise<void> {
    await this.documentRepository.delete(documentId);
  }
}
