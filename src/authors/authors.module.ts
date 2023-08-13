import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { AuthorsController } from './authors.controller'
import { Author } from './entities/author.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
