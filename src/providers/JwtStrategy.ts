import { Strategy, ExtractJwt } from 'passport-jwt';

import config from '../config';
import UserService from './UserService';

class JwtStrategy {
  constructor(public readonly userService: UserService) {}

  createStrategy() {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    };

    return new Strategy(options, async (payload, done) => {
      try {
        const user = await this.userService.findByID(payload.userID);
  
        if (!user) {
          return done(null, { message: 'Unauthorized.' });
        }
  
        return done(null, user);
  
      } catch (error) {
        return done(error);
      }
    });
  }
}

export default JwtStrategy;
