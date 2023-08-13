import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorsService } from 'src/authors/authors.service'
import {
  And,
  FindOperator,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  createConnection,
} from 'typeorm'
import { Book } from './entities/book.entity'
import {
  ListBooksDtoController,
  ListBooksDtoService,
} from 'src/authors/dto/list-books.dto'
import { CategoriesService } from 'src/categories/categories.service'
import { getConnection, QueryRunner } from 'typeorm'
import {
  postgresDataSource,
  postgresOptions,
} from 'src/constants/postgres.datasource'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private readonly authorsService: AuthorsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  private readonly logger = new Logger(BooksService.name)

  async getAuthorsAndCategories(book: {
    authors: number[] | undefined
    categories: number[] | undefined
  }) {
    const authors =
      book.authors && (await this.authorsService.findAll(book.authors))

    const categories =
      book.categories && (await this.categoriesService.findAll(book.categories))

    return { categories, authors }
  }

  async create(newBook: CreateBookDto) {
    this.logger.log('Adding new book')

    const { authors, categories } = await this.getAuthorsAndCategories({
      categories: newBook.categories,
      authors: newBook.authors,
    })

    if (!authors || !authors.length) {
      throw new NotFoundException('Authors do not exist')
    }
    if (!categories || !categories.length) {
      throw new NotFoundException('Categories do not exist')
    }

    // Start a new query runner
    const queryRunner = postgresDataSource.createQueryRunner()

    // Wrap the entire operation in a transaction
    await queryRunner.startTransaction()

    try {
      const book = {
        ...newBook,
        categories,
        authors,
      }
      // Save the updated book
      await queryRunner.manager.save(Book, book)

      // Commit the transaction
      await queryRunner.commitTransaction()

      console.log('Categories and authors updated successfully')
    } catch (error) {
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction()
      console.error('Error updating categories and authors:', error.message)
    } finally {
      // Release the query runner
      await queryRunner.release()
    }

    // const book = {
    //   ...newBook,
    //   authors,
    //   categories,
    // }

    // return this.booksRepository.save(book)
  }

  async findAll(listBooksDto: ListBooksDtoService): Promise<Book[]> {
    this.logger.log('Getting all books')

    const { filter, pagination } = listBooksDto
    const { authors, categories, price, releaseDate } = filter
    const { limit, page } = pagination

    return this.booksRepository.find({
      where: {
        authors: authors && {
          id: In(authors),
        },
        categories: categories && {
          id: In(categories),
        },
        price: And(
          MoreThanOrEqual(price.minPrice || 0),
          LessThanOrEqual(price.maxPrice || 100000),
        ),
        releaseDate: And(
          MoreThanOrEqual(releaseDate.startDate || new Date('1000-01-01')),
          LessThanOrEqual(releaseDate.endDate || new Date()),
        ),
      },
      relations: {
        authors: true,
        categories: true,
      },
      take: limit,
      skip: limit * (page - 1),
    })
  }

  async findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOne({
      where: { id },
      relations: {
        authors: true,
        categories: true,
      },
    })
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id)
  }

  async update(id: number, updatedBook: UpdateBookDto) {
    const {
      categories: newCategories,
      authors: newAuthors,
      ...book
    } = updatedBook

    const { authors, categories } = await this.getAuthorsAndCategories({
      categories: newCategories,
      authors: newAuthors,
    })

    // Start a new query runner
    const queryRunner = await postgresDataSource.createQueryRunner()

    // Wrap the entire operation in a transaction
    await queryRunner.startTransaction()

    try {
      // Fetch the book from the database
      const oldBook: any = await queryRunner.manager.findOne(Book, {
        where: {
          id,
        },
        relations: {
          authors: true,
          categories: true,
        },
        // relations: ['categories', 'authors'],
      })

      if (!oldBook) {
        throw new Error('Book not found')
      }

      const newBook = {
        ...oldBook,
        ...book,
      }

      // Update the book's categories and authors
      newBook.categories = categories ?? newBook.categories //.map((category) => ({ id: category.id }))
      newBook.authors = authors ?? newBook.authors //.map((author) => ({ id: author.id }))

      // Save the updated book
      await queryRunner.manager.save(Book, newBook)

      // Commit the transaction
      await queryRunner.commitTransaction()

      console.log('Categories and authors updated successfully')
    } catch (error) {
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction()
      console.error('Error updating categories and authors:', error.message)
    } finally {
      // Release the query runner
      await queryRunner.release()
    }

    // return this.booksRepository.update(id, {
    //   ...book,
    //   authors: [{ id: authors[0].id }],
    //   categories,
    // })
  }
}
