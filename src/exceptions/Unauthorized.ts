import HTTPError from './HTTPError';

class Unauthorized extends HTTPError {
  public readonly statusCode = 401;

  public readonly payload = {
    error: 'unauthorized',
    statusCode: this.statusCode,
    message: this.message || 'invalid password'
  };
}

export default Unauthorized;
