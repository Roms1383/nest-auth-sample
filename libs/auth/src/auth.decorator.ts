import {
  applyDecorators,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Unauthenticated } from './auth.filter'
import { LoginGuard } from './login.guard'
import { Authenticated } from './auth.interceptor'
import { AuthenticatedGuard } from './authenticated.guard'

export const CookieSessionLogin = () =>
  applyDecorators(
    UseGuards(LoginGuard),
    UseFilters(Unauthenticated),
    UseInterceptors(Authenticated),
  )
export const CookieSessionAuth = () =>
  applyDecorators(UseGuards(AuthenticatedGuard), UseFilters(Unauthenticated))
