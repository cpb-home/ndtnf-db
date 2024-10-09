import { Injectable } from '@nestjs/common';
import {
  Connection,
  HydratedDocument,
  Model,
  QueryWithHelpers,
} from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/books.schema';
import { CreateBookDto } from './interfaces/create-book';
import { UpdateBookDto } from './interfaces/update-book';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);

    return book.save();
  }

  public getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public update(
    id: string,
    data: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.BookModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(
    id: string,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.BookModel.findOneAndDelete({ _id: id });
  }
}
