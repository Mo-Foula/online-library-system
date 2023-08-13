import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { AuthorsModule } from 'src/authors/authors.module'
import { CategoriesModule } from 'src/categories/categories.module'
import { ClaimActions } from 'src/auth/claims/constants'
import { AuthorizationMiddlewareCreator } from 'src/middlewares/authorization'
import {
  routesControllers,
  routesPaths,
} from 'src/constants/routes.paths.constants'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorsModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AuthorizationMiddlewareCreator(routesControllers.books.name, [
          ClaimActions.read,
        ]),
      )
      .forRoutes(
        {
          path: routesPaths[routesControllers.books.name],
          method: RequestMethod.ALL,
        },
        {
          path: routesControllers.books.oneWithParam.name,
          method: RequestMethod.GET,
        },
      )

    consumer
      .apply(
        AuthorizationMiddlewareCreator(routesControllers.books.name, [
          ClaimActions.create,
        ]),
      )
      .forRoutes({
        path: routesPaths[routesControllers.books.name],
        method: RequestMethod.POST,
      })

    consumer
      .apply(
        AuthorizationMiddlewareCreator(routesControllers.books.name, [
          ClaimActions.update,
        ]),
      )
      .forRoutes({
        path: routesControllers.books.oneWithParam.name,
        method: RequestMethod.PATCH,
      })
  }
}
