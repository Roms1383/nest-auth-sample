import {
  applyDecorators,
  NotImplementedException,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { Unauthenticated } from './auth.filter'
import { Authenticated } from './auth.interceptor'
import { LoginGuard } from './login.guard'
import { AuthenticatedGuard } from './authenticated.guard'

type Provider = 'local' | 'facebook'

export const Authenticate = (type: Provider) => {
  switch (type) {
    case 'local':
      return applyDecorators(
        UseGuards(LoginGuard),
        UseFilters(Unauthenticated),
        UseInterceptors(Authenticated),
      )
    case 'facebook':
      return applyDecorators(UseGuards(AuthGuard('facebook-token')))
  }
}
export const Authentication = (type: Provider) => {
  switch (type) {
    case 'local':
      return applyDecorators(
        UseGuards(AuthenticatedGuard),
        UseFilters(Unauthenticated),
      )
    case 'facebook':
      throw new NotImplementedException('not implemented yet')
  }
}
