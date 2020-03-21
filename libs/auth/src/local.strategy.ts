import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthModuleOptions, PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly service: AuthService,
    private readonly options: AuthModuleOptions,
  ) {
    super()
  }
  async validate(username: string, password: string): Promise<any> {
    console.log(`@LocalStrategy validate`)
    const user = await this.service.validateUser(username, password)
    console.log(`@LocalStrategy validate ${JSON.stringify(user)}`)
    if (!user) throw new UnauthorizedException('Unknown user')
    return user
  }
  public successRedirect: string = this.options['successRedirect'] // '/secured-page'
  public failureRedirect: string = this.options['failureRedirect'] // '/login-page'
}
