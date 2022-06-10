import Conflict from '../../exceptions/Conflict';
import Unauthorized from '../../exceptions/Unauthorized';
import JwtService from "../../providers/JwtService";
import UserService from "../../providers/UserService";
import ILoginPayload from '../../interfaces/ILoginPayload';
import IRegisterPayload from '../../interfaces/IRegisterPayload';
import IVerifyEmailQuery from '../../interfaces/IVerifyEmailQuery';
import Mail from '../../providers/Mail';
import IUser from '../../interfaces/IUser';

class AuthController {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mail: Mail) {}

  async register({ payload }: { payload: IRegisterPayload }) {
    if(await this.userService.findOneByEmail(payload.email)) {
      throw new Conflict('The email address has already been taken.');
    }

    await this.userService.create(payload);

    // TODO: 201 status code
    return {
      message: 'User created.',
    }
  }

  async login({payload}: { payload: ILoginPayload }) {
    const user = await this.userService.findOneByEmail(payload.email);

    if( ! user || ! await user.verifyPassword(payload.password)) {
      throw new Unauthorized('Please double check your email and password.');
    }

    return {
      token: this.jwtService.sign({ userID: user.id }),
    };
  }

  async sendEmail({ user }: { user: IUser }) {
    if(user.verified) {
      throw new Conflict('The email address has already been verified.');
    }

    const key = await user.generateEmailVerificationKey();

    // TODO: Read from env
    const link = `http://localhost:3000/auth/verify-email?key=${key}`
    const html = `Hey buddy,
    Please click the link below to confirm your email address:
    <a href="${link}">${link}</a>`;

    // TODO: Use a background worker to retry on failures
    await this.mail.send(user.email, 'Please confirm your email address', html);

    return { message: `Sent an email to ${user.email}` };
  }

  async verifyEmail({ query }: { query: IVerifyEmailQuery }) {
    // TODO: Add key expiration period
    if(await this.userService.verifyEmail(query.key)) {
      return { message: 'Verified.' }
    }
    return { message: 'Invalid key.' }
  }
}

export default AuthController;
