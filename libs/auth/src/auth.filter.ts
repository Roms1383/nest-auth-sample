import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common'
import { Response } from 'express'
import { FAILURE_REDIRECT } from './constants'

@Catch(UnauthorizedException, ForbiddenException)
export class Unauthenticated implements ExceptionFilter {
  @Inject(FAILURE_REDIRECT)
  public failureRedirect: string // '/login-page'
  catch(
    _exception: ForbiddenException | UnauthorizedException,
    host: ArgumentsHost,
  ) {
    console.log(
      _exception instanceof ForbiddenException ? `@Forbidden` : `@Unauthorized`,
    )
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    response.redirect(this.failureRedirect)
  }
}
