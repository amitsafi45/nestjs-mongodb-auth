import { ObjectId } from "mongoose";
import { UserDTO } from "src/dtos/user.dto";

export interface IToken{
    token:string,
    expiryDate:Date,
    userId:any
}