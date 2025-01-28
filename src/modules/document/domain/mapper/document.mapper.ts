import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { Document } from '../entity/document.entity';

export class DocumentMapper {
  static dtoToEntity(document: CreateDocumentDto) {
    const newDocument = new Document();
    newDocument.url = document.url;
    newDocument.src = document.src;
    newDocument.title = document.title;
    newDocument.description = document.description;
    return newDocument;
  }

  static dtoToUpdateEntity(
    documentUpdate: UpdateDocumentDto,
    documentExisting: Document,
  ) {
    return {
      ...documentExisting,
      ...documentUpdate,
    };
  }
}
