import Conflict from '../../exceptions/Conflict';
import UserService from "../../providers/UserService";
import IRegisterPayload from '../../interfaces/IRegisterPayload';

class AuthController {
  constructor(private readonly userService: UserService) {}

  async register(payload: IRegisterPayload) {
    if(await this.userService.findOneByEmail(payload.email)) {
      throw new Conflict('The email address has already been taken.');
    }

    await this.userService.create(payload);

    // TODO: 201 status code
    return 'User created.';
  }
}

export default AuthController;
