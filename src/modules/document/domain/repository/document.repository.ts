import { Document } from '../entity/document.entity';

export interface IDocumentRepository {
  findAllDocumentsForAUser(userId: number): Promise<Document[]>;
  save(document: Document): Promise<Document>;
  findByUrl(url: string): Promise<Document | null>;
  findBySrc(src: string): Promise<Document | null>;
  findOneDocument(userId: number, documentId: number): Promise<Document | null>;
  update(document: Document): Promise<void>;
  delete(id: number): Promise<void>;
}
