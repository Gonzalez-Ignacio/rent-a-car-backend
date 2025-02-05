import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Document } from '../entity/document.entity';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { UserService } from '../../../../modules/user/domain/service/user.service';
import { DocumentRepository } from '../../infraestructure/document.typeorm.repository';
import { DocumentMapper } from '../mapper/document.mapper';
import { UpdateDocumentDto } from '../dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    private readonly userService: UserService,
    private readonly documentRepository: DocumentRepository,
  ) {}

  async getDocuments(userUuid: string): Promise<Document[]> {
    const userFound = await this.userService.getUser(userUuid);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.documentRepository.findAllDocumentsByUser(userUuid);
  }

  async getDocument(userUuid: string, documentUuid: string): Promise<Document> {
    const documentFound = await this.documentRepository.findOneDocument(
      userUuid,
      documentUuid,
    );

    if (!documentFound) {
      throw new HttpException(
        'Document or User not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return documentFound;
  }

  async createDocument(userUuid: string, document: CreateDocumentDto) {
    const newDocument = DocumentMapper.dtoToEntity(document);
    newDocument.user = await this.userService.getUser(userUuid);

    const documentFoundByUrl = await this.documentRepository.findByUrl(
      newDocument.url,
    );

    const documentFoundBySrc = await this.documentRepository.findBySrc(
      newDocument.src,
    );

    if (documentFoundByUrl) {
      throw new HttpException(
        'Document already exists with this URL',
        HttpStatus.CONFLICT,
      );
    }

    if (documentFoundBySrc) {
      throw new HttpException(
        'Document already exists with this Src',
        HttpStatus.CONFLICT,
      );
    }

    return this.documentRepository.save(newDocument);
  }

  async update(
    userUuid: string,
    documentUuid: string,
    documentUpdate: UpdateDocumentDto,
  ): Promise<Document> {
    const documentFound = await this.documentRepository.findOneDocument(
      userUuid,
      documentUuid,
    );

    if (!documentFound) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    const updateDocument = DocumentMapper.dtoToUpdateEntity(
      documentUpdate,
      documentFound,
    );

    return this.documentRepository.save(updateDocument);
  }

  async delete(userUuid: string, documentUuid: string): Promise<void> {
    const resultDelete = await this.documentRepository.findOneDocument(
      userUuid,
      documentUuid,
    );

    if (!resultDelete) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    await this.documentRepository.delete(documentUuid);
  }
}
