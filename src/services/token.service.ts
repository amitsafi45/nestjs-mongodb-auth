import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Model, ObjectId } from "mongoose";
import { UserDTO } from "src/dtos/user.dto";
import { IToken } from "src/interfaces/token.interface";

@Injectable()
export class TokenService{
    constructor(@Inject('TOKEN_MODEL') private tokenModel:Model<IToken>, private jwtService: JwtService,private configService:ConfigService){}

    async create(data:IToken){
        return (await this.tokenModel.create(data)).save()
    }

    async findOneByTokenAndId(token:string,user:UserDTO){
        return await this.tokenModel.findOne({
            token:token,
            user:user
        })
    }

    async tokenGenrated(payload:Partial<UserDTO>):Promise<{access:string,refresh:string}>{

        return {access: await this.jwtService.signAsync(payload,{
            secret: this.configService.get('ACCESS_SECRET_KEY'),
            expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN')
        }),
        refresh: await this.jwtService.signAsync(payload,{
            secret: this.configService.get('REFRESH_SECRET_KEY'),
            expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        })}
    }
}