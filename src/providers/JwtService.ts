import JWT from 'jsonwebtoken';

import config from '../config';

class JwtService {
  sign(payload: { userID: string }) {
    return JWT.sign(payload, config.JWT_SECRET);
  }
}

export default JwtService;
