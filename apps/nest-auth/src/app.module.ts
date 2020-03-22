import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CookieSessionModule } from '@kroms/auth'

@Module({
  // or, for example: imports: [CookieSessionModule.register({ successRedirect: '/secured-page', failureRedirect: '/login-page' })],
  imports: [CookieSessionModule],
  controllers: [AppController],
})
export class AppModule {}
