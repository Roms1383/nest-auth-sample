import { DynamicModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { FAILURE_REDIRECT, SUCCESS_REDIRECT } from './constants'
import { LocalStrategy } from './local.strategy'
import { SessionSerializer } from './session.serializer'

const parameters = {
  imports: [PassportModule.register({ session: true}),],
  controllers: [AuthController],
  exports: [SUCCESS_REDIRECT,FAILURE_REDIRECT], // this export is required to be able to reuse exception filter
}

@Module({
  ...parameters,
  providers: [
    AuthService,
    { provide: SUCCESS_REDIRECT, useValue: '/secured-page', },
    { provide: FAILURE_REDIRECT, useValue: '/login-page', },
    LocalStrategy,
    SessionSerializer
  ],
})
export class AuthModule {
  // here we could allow for customizing the service, strategy, serializer
  static register({
    successRedirect,
    failureRedirect,
  }): DynamicModule {
    return {
      module: AuthModule,
      ...parameters,
      providers: [
        AuthService,
        { provide: SUCCESS_REDIRECT, useValue: successRedirect || '/secured-page', },
        { provide: FAILURE_REDIRECT, useValue: failureRedirect || '/login-page', },
        LocalStrategy,
        SessionSerializer
      ],
    }
  }
}
