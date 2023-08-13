import { Author } from 'src/authors/entities/author.entity'
import { Category } from 'src/categories/entities/category.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  numberOfPages: number

  @Column()
  price: number

  @Column({ type: 'date' })
  releaseDate: Date

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({
    name: 'books_categories',
  })
  categories: Category[]

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: 'books_authors',
  })
  authors: Author[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
