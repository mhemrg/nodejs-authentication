import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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

export default mongoose.model('User', userSchema);
