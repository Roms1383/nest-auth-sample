import {
  Controller,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Unauthorized } from './auth.filter'
import { LocalStrategy } from './local.strategy'
import { LoginGuard } from './login.guard'
import { Authorized } from './auth.interceptor'

@Controller()
export class AuthController {
  constructor(private readonly strategy: LocalStrategy) {}
  @Post('login')
  @UseGuards(LoginGuard)
  @UseFilters(Unauthorized)
  @UseInterceptors(Authorized)
  async login(@Req() req, @Res() res) { console.log(`@AuthController /login ${JSON.stringify(req.user)}`) }
}
