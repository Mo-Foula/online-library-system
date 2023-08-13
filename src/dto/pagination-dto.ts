import { IsNumber } from 'class-validator'

export class Pagination {
  @IsNumber()
  limit?: number
  @IsNumber()
  page?: number
}
