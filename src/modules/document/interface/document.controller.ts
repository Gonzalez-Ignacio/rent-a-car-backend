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

  @Get()
  getDocuments(): Promise<Document[]> {
    return this.documentService.getDocuments();
  }

  @Get(':id')
  getDocument(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentService.getDocument(id);
  }

  @Post()
  createPost(@Body() newDocument: CreateDocumentDto) {
    return this.documentService.createDocument(newDocument);
  }

  @Patch(':id')
  updateDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocument: UpdateDocumentDto,
  ) {
    return this.documentService.updateDocument(id, updateDocument);
  }

  @Delete(':id')
  deleteDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.deleteDocument(id);
  }
}
