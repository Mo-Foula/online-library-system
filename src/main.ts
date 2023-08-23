import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

import * as dotenv from 'dotenv'
dotenv.config()

const { PORT } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT || 3000)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
}
bootstrap()
