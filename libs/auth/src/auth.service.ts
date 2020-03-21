import { Injectable, UnauthorizedException } from '@nestjs/common'

const users = [
  {
    name: 'john doe',
    username: 'john.doe@email.com',
    password: 'some-password',
    role: 'admin',
  },
  {
    name: 'jane doe',
    username: 'jane.doe@email.com',
    password: 'some-other-password',
    role: 'admin',
  },
]

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any> {
    try {
      console.log(
        `@AuthService validateUser (username: ${username}, password: ${password})`,
      )
      if (!username || !password)
        throw new UnauthorizedException('Missing username or password')
      const { name = undefined, role = undefined } =
        users.find(
          user => user.username === username && user.password === password,
        ) || {}
      if (!name || !role) return null
      return { name, role }
    } catch (e) {
      return null
    }
  }
}
