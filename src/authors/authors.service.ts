import { Injectable } from '@nestjs/common'
import { CreateAuthorDto } from './dto/create-author.dto'
import { In, Repository } from 'typeorm'
import { Author } from './entities/author.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorsRepository.save(createAuthorDto)
  }

  async findAll(authors: number[]) {
    return this.authorsRepository.find({
      where: {
        id: In(authors),
      },
      relations: {
        books: true,
      },
    })
  }

  async findOne(id: number) {
    return await this.authorsRepository.findOneBy({
      id,
    })
  }

  // update(id: number, updateAuthorDto: UpdateAuthorDto) {
  //   return `This action updates a #${id} author`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} author`
  // }
}
