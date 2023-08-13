import { Book } from 'src/books/entities/book.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'date' })
  birthDate: Date

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[]

  @Column()
  gender: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
