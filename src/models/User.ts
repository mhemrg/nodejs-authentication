import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import IUser from '../interfaces/IUser';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  emailVerificationKey: String,
}, { timestamps: true });

userSchema.pre("save", async function(next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateEmailVerificationKey = async function () {
  this.emailVerificationKey = uuid();
  await this.save();

  return this.emailVerificationKey;
};

export default mongoose.model('User', userSchema);
