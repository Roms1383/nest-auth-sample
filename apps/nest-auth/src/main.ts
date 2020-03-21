import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as cookieSession from 'cookie-session'
import * as passport from 'passport'
import { AppModule } from './app.module'

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.use(cookieSession({ secret: process.env.COOKIE_SESSION_SECRET }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
