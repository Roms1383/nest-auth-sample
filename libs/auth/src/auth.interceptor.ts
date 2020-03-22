import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SUCCESS_REDIRECT } from './constants';

@Injectable()
export class Authorized implements NestInterceptor {
  @Inject(SUCCESS_REDIRECT)
  public successRedirect: string // '/secured-page'
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(`@Authorized`)
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    if (request.user) return response.redirect(this.successRedirect)
    return next.handle()
  }
}