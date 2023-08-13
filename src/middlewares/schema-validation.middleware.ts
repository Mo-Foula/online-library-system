import { Request, Response, NextFunction } from 'express'
import { Schema } from 'yup'

export function SchemaValidateMiddleware(toBeValidated: any, schema: Schema) {
  return async function schemaValidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await schema.validate(toBeValidated)
      next()
    } catch (ex) {
      next(ex)
    }
  }
}
