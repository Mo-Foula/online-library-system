import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import {
  ListBooksDtoController,
  ListBooksDtoService,
} from 'src/authors/dto/list-books.dto'
import { StringToArray } from 'src/helpers/string-to-array'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/new')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  // findAll(@Query() pagination: { pageSize: string; pageNumber: string }) {
  @Get('/list')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() listBooksDtoController: ListBooksDtoController) {
    const {
      authors,
      categories,
      maxPrice,
      minPrice,
      endDate,
      startDate,
      limit,
      page,
    } = listBooksDtoController

    const listBooksDtoService: ListBooksDtoService = {
      filter: {
        // authors: JSON.parse(authors as unknown as string),
        // categories: JSON.parse(categories as unknown as string),
        authors: StringToArray(authors as unknown as string),
        categories: StringToArray(categories as unknown as string),
        price: {
          maxPrice,
          minPrice,
        },
        releaseDate: {
          endDate,
          startDate,
        },
      },
      pagination: {
        limit,
        page,
      },
    }
    return await this.booksService.findAll(listBooksDtoService)
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id)
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.booksService.remove(+id)
  // }
}
