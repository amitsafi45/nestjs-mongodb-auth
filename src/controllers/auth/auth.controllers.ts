import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UserDTO} from "src/dtos/user.dto";
import { TokenService } from "src/services/token.service";
import { UserService } from "src/services/user.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly userSerive:UserService,private readonly tokenSerive:TokenService){}
    @Post('/sign-up')
    async create(@Body()body:UserDTO,@Res()res:Response){
      const isEmailAreadyExist=await this.userSerive.findOneByEmail(body.email)
      let newUser={}
        if(isEmailAreadyExist){
           newUser=isEmailAreadyExist    
        }else{
            newUser= await this.userSerive.create(body)
        }
      // const check=await this.tokenSerive.create({token:"sjdh",expiryDate:new Date(),user:newUser})
    return res.status(HttpStatus.ACCEPTED).json({
        statusCode:HttpStatus.ACCEPTED,
        message:"Sign-Up Successfully",
        data:newUser
      })
    }
}