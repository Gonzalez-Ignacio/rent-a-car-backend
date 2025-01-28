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

  getDocuments() {
    return this.documentRepository.findAll();
  }

  async getDocument(id: number): Promise<Document> {
    const documentFound = await this.documentRepository.findById(id);

    if (!documentFound) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    return documentFound;
  }

  async createDocument(document: CreateDocumentDto) {
    const newDocument = DocumentMapper.dtoToEntity(document);

    const documentFound = await this.documentRepository.findByUrl(
      newDocument.url,
    );

    if (documentFound) {
      throw new HttpException('Document already exists', HttpStatus.CONFLICT);
    }

    return this.documentRepository.save(newDocument);
  }

  async updateDocument(id: number, document: UpdateDocumentDto) {
    const documentFound = await this.documentRepository.findById(id);

    if (!documentFound) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    const updateDocument = DocumentMapper.dtoToUpdateEntity(
      document,
      documentFound,
    );

    return this.documentRepository.save(updateDocument);
  }

  async deleteDocument(id: number) {
    const resultDelete = await this.documentRepository.findById(id);

    if (!resultDelete) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    await this.documentRepository.delete(id);
  }
}
