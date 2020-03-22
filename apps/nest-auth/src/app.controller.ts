import { CookieSessionAuth } from '@kroms/auth';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('secured-page')
  @CookieSessionAuth()
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
