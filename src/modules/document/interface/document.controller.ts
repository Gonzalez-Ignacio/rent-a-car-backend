import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDocumentDto } from '../domain/dto/create-document.dto';
import { DocumentService } from '../domain/service/document.service';
import { Document } from '../domain/entity/document.entity';
import { UpdateDocumentDto } from '../domain/dto/update-document.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('user/:userId')
  getDocuments(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Document[]> {
    return this.documentService.getDocuments(userId);
  }

  @Get(':documentId/user/:userId')
  getDocument(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('documentId', ParseIntPipe) documentId: number,
  ): Promise<Document> {
    return this.documentService.getDocument(userId, documentId);
  }

  @Post()
  createPost(@Body() newDocument: CreateDocumentDto) {
    return this.documentService.createDocument(newDocument.userId, newDocument);
  }

  @Patch(':documentId/user/:userId')
  updateDocument(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('documentId', ParseIntPipe) documentId: number,
    @Body() updateDocument: UpdateDocumentDto,
  ): Promise<Document> {
    return this.documentService.update(userId, documentId, updateDocument);
  }

  @Delete(':documentId/user/:userId')
  deleteDocument(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('documentId', ParseIntPipe) documentId: number,
  ) {
    return this.documentService.delete(userId, documentId);
  }
}
