import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BooksModule } from './books/books.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { postgresOptions } from './constants/postgres.datasource'

@Module({
  imports: [BooksModule, TypeOrmModule.forRoot(postgresOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
