import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDocument } from './schemas/books.schema';
import { CreateBookDto } from './interfaces/create-book';
import { IParamId } from './interfaces/param-id';
import { UpdateBookDto } from './interfaces/update-book';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  public delete(
    @Param() { id }: IParamId,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.bookService.delete(id);
  }
}
