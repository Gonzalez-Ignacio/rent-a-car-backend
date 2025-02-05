import { Document } from '../entity/document.entity';

export interface IDocumentRepository {
  findAllDocumentsByUser(userUuid: string): Promise<Document[]>;
  save(document: Document): Promise<Document>;
  findByUrl(url: string): Promise<Document | null>;
  findBySrc(src: string): Promise<Document | null>;
  findOneDocument(
    userUuid: string,
    documentUuid: string,
  ): Promise<Document | null>;
  update(document: Document): Promise<void>;
  delete(documentUuid: string): Promise<void>;
}
