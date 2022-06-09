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
}

export default UserService;
