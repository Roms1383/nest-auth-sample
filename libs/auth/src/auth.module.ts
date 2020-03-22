import { DynamicModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { FAILURE_REDIRECT, SUCCESS_REDIRECT } from './constants'
import { LocalStrategy } from './local.strategy'
import { SessionSerializer } from './session.serializer'
import { ModuleMetadata } from '@nestjs/common/interfaces'

interface OnLoginRedirect {
  successRedirect?: string
  failureRedirect?: string
}

const metadata = (options?: OnLoginRedirect): ModuleMetadata => ({
  imports: [PassportModule.register({ session: true })],
  providers: [
    {
      provide: SUCCESS_REDIRECT,
      useValue: options?.successRedirect || '/secured-page',
    },
    {
      provide: FAILURE_REDIRECT,
      useValue: options?.failureRedirect || '/login-page',
    },
    AuthService,
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [SUCCESS_REDIRECT, FAILURE_REDIRECT], // this export is required to be able to reuse exception filter / guard
})

@Module(metadata())
export class CookieSessionModule {
  static register(options?: OnLoginRedirect): DynamicModule {
    return {
      module: CookieSessionModule,
      ...metadata(options),
    }
  }
}
