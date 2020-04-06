import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    });
  }

  async validate(payload: JwtPayload) {
    const { username, roles, id_user } = payload;
    const user = this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
