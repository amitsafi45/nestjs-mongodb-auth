import mongoose, { Types } from 'mongoose';
import { GENDER, ROLE, SALT_WORK_FACTOR } from 'src/constants/enum';
import * as bcrypt from 'bcrypt';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required:true,unique:true,lowercase:true })
  email:string

  @Prop()
  password:string


  @Prop({ required: true, enum: GENDER })
  gender: string;

  @Prop({ type: [String], enum: ROLE, default: undefined })
  role: ROLE[];

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// export const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//   },
//   gender: {
//     type: String,
//     enum: GENDER,
//   },
//   role: {
//     type: [
//       {
//         type: String,
//         enum: ROLE,
//       },
//     ],
//     require: false,
//     default: undefined,
//   },
// });

// UserSchema.pre('save', async function save(next) {
//   if (!this.isModified('password')) return next();
//   try {
//     this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });
