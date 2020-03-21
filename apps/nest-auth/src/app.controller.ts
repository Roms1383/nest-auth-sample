import { AuthenticatedGuard, Unauthorized } from '@kroms/auth'
import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common'

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
