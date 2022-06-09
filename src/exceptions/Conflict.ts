import HTTPError from './HTTPError';

class Conflict extends HTTPError {
  public readonly statusCode = 409;

  public readonly payload = {
    error: 'conflict',
    statusCode: this.statusCode,
    message: this.message || 'there was a conflict'
  };
}

export default Conflict;
