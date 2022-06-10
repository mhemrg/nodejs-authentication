import User from '../models/User';
import IRegisterPayload from '../interfaces/IRegisterPayload';
import { Document } from 'mongoose';

class UserService {
  findByID(id: string) {
    return User.findById(id);
  }

  findOneByEmail(email: string) {
    return User.findOne({ email });
  }

  create(payload: IRegisterPayload) {
    return User.create(payload);
  }

  async verifyEmail(emailVerificationKey: string): Promise<boolean> {
    const { modifiedCount } = await User.updateOne(
      { emailVerificationKey }, { verified: true, emailVerificationKey: null });
    return Boolean(modifiedCount);
  }
}

export default UserService;
