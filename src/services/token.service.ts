import { Inject, Injectable } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { UserDTO } from "src/dtos/user.dto";
import { IToken } from "src/interfaces/token.interface";

@Injectable()
export class TokenService{
    constructor(@Inject('TOKEN_MODEL') private tokenModel:Model<IToken>){}

    async create(data:IToken){
        return (await this.tokenModel.create(data)).save()
    }

    async findOneByTokenAndId(token:string,user:UserDTO){
        return await this.tokenModel.findOne({
            token:token,
            user:user
        })
    }
}