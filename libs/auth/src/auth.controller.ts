import { Controller, Post, Req, Get } from '@nestjs/common'
import { Authenticate } from './auth.decorator'

@Controller()
export class AuthController {
  @Post('login')
  @Authenticate('local')
  async login(@Req() req) {
    console.log(req.user)
  }
}
