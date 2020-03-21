import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from '@kroms/auth'

@Module({
  // or, for example: imports: [AuthModule.register({ successRedirect: '/secured-page', failureRedirect: '/login-page' })],
  imports: [AuthModule],
  controllers: [AppController],
})
export class AppModule {}
