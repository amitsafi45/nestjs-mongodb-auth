import mongoose from 'mongoose';
import { GENDER, ROLE, SALT_WORK_FACTOR } from 'src/constants/enum';
import * as bcrypt from 'bcrypt';
export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
    enum: GENDER,
  },
  role: {
    type: [
      {
        type: String,
        enum: ROLE,
      },
    ],
    require: false,
    default: undefined,
  },
});

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    return next();
  } catch (err) {
    return next(err);
  }
});
