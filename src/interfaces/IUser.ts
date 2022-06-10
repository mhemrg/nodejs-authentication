export default interface IUser {
  email: string,
  password: string,
  emailVerificationKey: string,
  verified: boolean,
  verifyPassword: (pass: string) => Promise<boolean>,
  generateEmailVerificationKey: () => Promise<string>
}
