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

  async getDocuments(userId: number): Promise<Document[]> {
    const userFound = await this.userService.getUser(userId);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.documentRepository.findAllDocumentsForAUser(userId);
  }

  async getDocument(userId: number, documentId: number): Promise<Document> {
    const documentFound = await this.documentRepository.findOneDocument(
      userId,
      documentId,
    );

    if (!documentFound) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    return documentFound;
  }

  async createDocument(userId: number, document: CreateDocumentDto) {
    const newDocument = DocumentMapper.dtoToEntity(document);
    newDocument.user = await this.userService.getUser(userId);

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

  async updateDocument(
    userId: number,
    documentId: number,
    documentUpdate: UpdateDocumentDto,
  ) {
    const documentFound = await this.documentRepository.findOneDocument(
      userId,
      documentId,
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

  async deleteDocument(userId: number, documentId: number): Promise<void> {
    const resultDelete = await this.documentRepository.findOneDocument(
      userId,
      documentId,
    );

    if (!resultDelete) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    await this.documentRepository.delete(documentId);
  }
}
