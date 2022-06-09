export default abstract class HTTPError extends Error {
  public abstract readonly statusCode: number;
  public abstract readonly payload: any;
}
