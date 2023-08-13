import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config()
const {
  POSTGRES_HOST: pg_host,
  POSTGRES_DB: pg_db,
  POSTGRES_USER: pg_user,
  POSTGRES_PASSWORD: pg_password,
  POSTGRES_PORT: pg_port,
} = process.env

export const postgresOptions: DataSourceOptions = {
  type: 'postgres',
  host: pg_host,
  port: parseInt(pg_port) || 5432,
  username: pg_user,
  password: pg_password,
  database: pg_db,
  entities: ['./**/*.entity.js'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
}

export const postgresDataSource = new DataSource(postgresOptions)
postgresDataSource.connect()
