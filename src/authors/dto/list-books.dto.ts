import { Transform, TransformFnParams, Type } from 'class-transformer'
import { IsArray, IsNumber, ValidateNested, IsOptional } from 'class-validator'
import { Pagination } from 'src/dto/pagination-dto'

class filterType {
  price?: {
    minPrice?: number
    maxPrice?: number
  }
  releaseDate?: {
    startDate?: Date
    endDate?: Date
  }
  categories?: Array<number>
  authors?: Array<number>
}

export class ListBooksDtoController {
  @IsNumber()
  @IsOptional()
  page?: number
  @IsNumber()
  @IsOptional()
  limit?: number
  @IsNumber()
  @IsOptional()
  minPrice?: number
  @IsNumber()
  @IsOptional()
  maxPrice?: number
  @Type(() => Date)
  @IsOptional()
  startDate?: Date
  @Type(() => Date)
  @IsOptional()
  endDate?: Date

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categories?: Array<number>

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  authors?: Array<number>
}

export class ListBooksDtoService {
  pagination: Pagination
  filter: filterType
}
