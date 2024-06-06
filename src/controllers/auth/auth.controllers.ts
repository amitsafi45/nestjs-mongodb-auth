import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UserDto } from "src/dtos/user.dto";
import { UserService } from "src/services/user.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly userSerive:UserService){}
    @Post('/sign-up')
    async create(@Body()body:UserDto,@Res()res:Response){
      const isEmailAreadyExist=await this.userSerive.findOneByEmail(body.email)
      let newUser={}
        if(isEmailAreadyExist){
           newUser=isEmailAreadyExist    
        }else{
            newUser= await this.userSerive.create(body)
        }

    return res.status(HttpStatus.ACCEPTED).json({
        statusCode:HttpStatus.ACCEPTED,
        message:"Sign-Up Successfully",
        data:newUser
      })
    }
}