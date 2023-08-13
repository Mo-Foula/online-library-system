import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { Category } from './entities/category.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClaimActions } from 'src/auth/claims/constants'
import {
  routesControllers,
  routesPaths,
} from 'src/constants/routes.paths.constants'
import { AuthorizationMiddlewareCreator } from 'src/middlewares/authorization'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AuthorizationMiddlewareCreator(routesControllers.categories.name, [
          ClaimActions.read,
        ]),
      )
      .forRoutes({
        path: routesPaths[routesControllers.categories.name],
        method: RequestMethod.ALL,
      })

    consumer
      .apply(
        AuthorizationMiddlewareCreator(routesControllers.categories.name, [
          ClaimActions.create,
        ]),
      )
      .forRoutes({
        path: routesPaths[routesControllers.categories.name],
        method: RequestMethod.POST,
      })

    consumer
      .apply(
        AuthorizationMiddlewareCreator(routesControllers.categories.name, [
          ClaimActions.update,
        ]),
      )
      .forRoutes({
        path: routesPaths[routesControllers.categories.name],
        method: RequestMethod.PATCH,
      })
  }
}
