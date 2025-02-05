import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDocumentDto } from '../domain/dto/create-document.dto';
import { DocumentService } from '../domain/service/document.service';
import { UpdateDocumentDto } from '../domain/dto/update-document.dto';
import { DocumentResponseDto } from '../domain/dto/document.response.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('user/:userUuid')
  getDocuments(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
  ): Promise<DocumentResponseDto[]> {
    return this.documentService.getDocuments(userUuid);
  }

  @Get(':documentUuid/user/:userUuid')
  getDocument(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
    @Param('documentUuid', ParseUUIDPipe) documentUuid: string,
  ): Promise<DocumentResponseDto> {
    return this.documentService.getDocument(userUuid, documentUuid);
  }

  @Post()
  createDocument(@Body() newDocument: CreateDocumentDto) {
    return this.documentService.createDocument(
      newDocument.userUuid,
      newDocument,
    );
  }

  @Patch(':documentUuid/user/:userUuid')
  updateDocument(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
    @Param('documentUuid', ParseUUIDPipe) documentUuid: string,
    @Body() updateDocument: UpdateDocumentDto,
  ): Promise<DocumentResponseDto> {
    return this.documentService.update(userUuid, documentUuid, updateDocument);
  }

  @Delete(':documentUuid/user/:userUuid')
  deleteDocument(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
    @Param('documentUuid', ParseUUIDPipe) documentUuid: string,
  ) {
    return this.documentService.delete(userUuid, documentUuid);
  }
}
