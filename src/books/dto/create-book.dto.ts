export class CreateBookDto {
  name: string
  numberOfPages: number
  price?: number
  releaseDate?: Date
  authors?: number[]
  categories?: number[]
}
