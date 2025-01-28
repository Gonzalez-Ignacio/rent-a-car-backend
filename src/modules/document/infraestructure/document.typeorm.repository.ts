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

  async findAll(): Promise<Document[]> {
    return await this.documentRepository.find();
  }

  async save(document: Document): Promise<Document> {
    return await this.documentRepository.save(document);
  }

  async findByUrl(url: string): Promise<Document | null> {
    return await this.documentRepository.findOneBy({ url });
  }

  async findById(id: number): Promise<Document | null> {
    return await this.documentRepository.findOneBy({ id });
  }

  async update(document: Document): Promise<void> {
    await this.documentRepository.update(document.id, document);
  }

  async delete(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
}
