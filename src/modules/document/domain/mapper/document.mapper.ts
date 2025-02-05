import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentResponseDto } from '../dto/document.response.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { Document } from '../entity/document.entity';
import { UserMapper } from '../../../user/domain/mapper/user.mapper';

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

  static entityToDto(document: Document) {
    const documentResponse = new DocumentResponseDto();
    documentResponse.uuid = document.uuid;
    documentResponse.url = document.url;
    documentResponse.src = document.src;
    documentResponse.title = document.title;
    documentResponse.description = document.description;
    documentResponse.user = UserMapper.entityToDto(document.user);
    return documentResponse;
  }
}
