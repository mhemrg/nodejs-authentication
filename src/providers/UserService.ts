import User from '../models/User';
import IRegisterPayload from '../interfaces/IRegisterPayload';

class UserService {
  async findOneByEmail(email: string): Promise<boolean> {
    return Boolean(await User.findOne({ email }));
  }

  create(payload: IRegisterPayload) {
    return User.create(payload);
  }
}

export default UserService;
