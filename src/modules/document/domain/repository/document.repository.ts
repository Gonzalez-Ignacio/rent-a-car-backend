import { Document } from '../entity/document.entity';

export interface IDocumentRepository {
  findAll(): Promise<Document[]>;
  save(document: Document): Promise<Document>;
  findByUrl(url: string): Promise<Document | null>;
  findById(id: number): Promise<Document | null>;
  update(document: Document): Promise<void>;
  delete(id: number): Promise<void>;
}
