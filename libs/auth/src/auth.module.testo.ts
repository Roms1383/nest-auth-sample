import { Controller, Get, Module, UseFilters, UseGuards } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import axios from 'axios'
import * as cookieParser from 'cookie-parser'
import * as cookieSession from 'cookie-session'
import * as passport from 'passport'
import { Unauthorized } from './auth.filter'
import { AuthModule } from './auth.module'
import { AuthenticatedGuard } from './authenticated.guard'
import { PassportModule } from '@nestjs/passport'

jest.setTimeout(20000)

const username = 'john.doe@email.com'
const password = 'some-password'
const secret = 'some-cookie-secret'

@Controller()
export class AppController {
  @Get('secured-page')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(Unauthorized) // beware here it requires LocalStrategy explicit export in AuthModule
  async securedPage() {
    console.log(`@AppController /secured-page`)
    return 'secured page'
  }

  @Get('login-page')
  async loginPage() {
    console.log(`@AppController /login-page`)
    return 'login page'
  }
}

@Module({
  // or, for example: imports: [AuthModule.register({ successRedirect: '/secured-page', failureRedirect: '/login-page' })],
  imports: [AuthModule],
  controllers: [AppController],
})
class AppModule {}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { logger: console })
  app.use(cookieParser())
  app.use(cookieSession({ secret }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
  return app
}

const teardown = async app => {
  await app.close()
  app = undefined
}

describe('AuthModule', () => {
  let app = undefined
  let cookie = undefined
  beforeAll(async () => {
    app = await bootstrap()
  })
  afterAll(async () => {
    await teardown(app)
  })
  describe('login', () => {
    it('correct credentials', async () => {
      try {
        const { data, headers, status } = await axios.post(
          `http://localhost:3000/login`,
          { username, password },
          { maxRedirects: 0, validateStatus: status => status === 302 },
        )
        cookie = headers['set-cookie']
          .map(cookie => cookie.split(';')[0])
          .reduce((acc, cookie) => acc + cookie + ';', '')
        expect(data).toBe('Found. Redirecting to /secured-page')
        expect(status).toBe(302)
        expect(headers['set-cookie']).toBeDefined()
      } catch (e) {
        console.error(e)
      }
    })
    it('incorrect credentials', async () => {
      const { data } = await axios.post(`http://localhost:3000/login`, {
        username: 'wrong',
        password: 'fake',
      })
      expect(data).toBe('login page')
    })
  })
  describe('secured page', () => {
    it('correctly authenticated', async () => {
      const { data } = await axios.get(`http://localhost:3000/secured-page`, {
        headers: { cookie: cookie },
      })
      expect(data).toBe('secured page')
    })
    it('not authenticated', async () => {
      const { data } = await axios.get(`http://localhost:3000/secured-page`)
      expect(data).toBe('login page')
    })
  })
})
