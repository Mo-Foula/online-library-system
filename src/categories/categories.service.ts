import { Injectable } from '@nestjs/common'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category'
  }
  async findAll(categories: number[]) {
    return this.categoryRepository.find({
      where: {
        id: In(categories),
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} category`
  }
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`
  }
  remove(id: number) {
    return `This action removes a #${id} category`
  }
}
