import { ObjectId, Schema } from "mongoose";

export interface IToken {
  token: string;
  expiryDate: Date;
  userId: Schema.Types.ObjectId;
}
