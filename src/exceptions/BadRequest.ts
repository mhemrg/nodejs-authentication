import HTTPError from './HTTPError';

class BadRequest extends HTTPError {
  public readonly statusCode = 400;

  public readonly payload = {
    error: 'bad request',
    statusCode: this.statusCode,
    message: this.message || 'invalid query',
  };
}

export default BadRequest;
