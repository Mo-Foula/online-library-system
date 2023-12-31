import { Book } from 'src/books/entities/book.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // TODO test this way
  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
