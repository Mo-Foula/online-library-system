import { PartialType } from '@nestjs/mapped-types'
import { CreateBookDto } from './create-book.dto'

export class UpdateBookDto extends PartialType(CreateBookDto) {
  name?: string
  numberOfPages?: number
  price?: number
  releaseDate?: Date
  authors?: number[]
  categories?: number[]
}
