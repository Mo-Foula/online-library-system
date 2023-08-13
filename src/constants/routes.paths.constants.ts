import { AuthController } from 'src/auth/auth.controller'
import { ClaimsController } from 'src/auth/claims/claims.controller'
import { RolesController } from 'src/auth/roles/roles.controller'
import { UsersController } from 'src/auth/users/users.controller'
import { AuthorsController } from 'src/authors/authors.controller'
import { BooksController } from 'src/books/books.controller'
import { CategoriesController } from 'src/categories/categories.controller'
import { UsersProfiles } from 'src/users_profiles/entities/users_profiles.entity'
import { ControllerUtils } from 'src/utils/controller.utils'

export const routesControllers = {
  books: {
    name: 'books',
    controller: BooksController,
    oneWithParam: {
      name: 'books/:id',
      controller: BooksController,
    },
  },
  auth: {
    name: 'auth',
    controller: AuthController,
    signupAdmin: {
      name: 'auth/signupAdmin',
      controller: AuthController,
    },
  },
  users: {
    name: 'users',
    controller: UsersController,
  },
  usersProfiles: {
    name: 'usersProfiles',
    controller: UsersProfiles,
  },
  roles: {
    name: 'roles',
    controller: RolesController,
  },
  claims: {
    name: 'claims',
    controller: ClaimsController,
  },
  authors: {
    name: 'authors',
    controller: AuthorsController,
  },
  categories: {
    name: 'categories',
    controller: CategoriesController,
  },
}

export const routesPaths =
  ControllerUtils.getMultiplePathsFromControllers(routesControllers)
