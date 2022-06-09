export default interface IRouteOptions {
  method: string,
  prefix: string,
  schema?: any, // TODO:
  controller: any,
  action: string,
  auth?: 'jwt',
}
