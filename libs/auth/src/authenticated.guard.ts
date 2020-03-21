import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest()
    return request.isAuthenticated() && request.user.name && request.user.role
  }
}
