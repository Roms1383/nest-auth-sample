import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: any, id?: any) => void): void {
    console.log(`@SessionSerializer serializeUser`)
    done(null, user)
  }

  deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
    console.log(`@SessionSerializer deserializeUser`)
    done(null, payload)
  }
}
