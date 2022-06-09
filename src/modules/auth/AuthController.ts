import Conflict from '../../exceptions/Conflict';
import Unauthorized from '../../exceptions/Unauthorized';
import JwtService from "../../providers/JwtService";
import UserService from "../../providers/UserService";
import ILoginPayload from '../../interfaces/ILoginPayload';
import IRegisterPayload from '../../interfaces/IRegisterPayload';

class AuthController {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService) {}

  async register(payload: IRegisterPayload) {
    if(await this.userService.findOneByEmail(payload.email)) {
      throw new Conflict('The email address has already been taken.');
    }

    await this.userService.create(payload);

    // TODO: 201 status code
    return {
      message: 'User created.',
    }
  }

  async login(payload: ILoginPayload) {
    const user = await this.userService.findOneByEmail(payload.email);

    if( ! user || ! await user.verifyPassword(payload.password)) {
      throw new Unauthorized('Please double check your email and password.');
    }

    return {
      token: this.jwtService.sign({ userID: user.id }),
    };
  }

  sendEmail() {
    return { message: 'logged in' }
  }
}

export default AuthController;
