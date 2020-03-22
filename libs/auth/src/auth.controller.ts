import { Controller, Post } from '@nestjs/common'
import { CookieSessionLogin } from './auth.decorator'
import { LocalStrategy } from './local.strategy'

@Controller()
export class AuthController {
  constructor(private readonly strategy: LocalStrategy) {}
  @Post('login')
  @CookieSessionLogin()
  async login() {}
}
