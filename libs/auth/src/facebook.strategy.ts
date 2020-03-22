import { Injectable, Inject } from '@nestjs/common'
import { use } from 'passport'
import * as FacebookTokenStrategy from 'passport-facebook-token'

@Injectable()
export class FacebookStrategy {
  constructor(
    @Inject('facebook_client_id') private readonly clientID,
    @Inject('facebook_client_secret') private readonly clientSecret,
  ) {
    use(
      new FacebookTokenStrategy(
        {
          clientID: this.clientID,
          clientSecret: this.clientSecret,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = {}
          return done(null, user)
        },
      ),
    )
  }
}
