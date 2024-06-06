import { Body, Controller, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { SignInDTO } from "src/dtos/signIn.dto";
import { UserDTO} from "src/dtos/user.dto";
import { TokenService } from "src/services/token.service";
import { UserService } from "src/services/user.service";
import * as bcrypt from 'bcrypt'
import { ConfigService } from "@nestjs/config";
import { decode } from "querystring";
import { JwtService } from "@nestjs/jwt";
@Controller('auth')
export class AuthController{
    constructor(private readonly userSerive:UserService,private readonly tokenSerive:TokenService,private configService:ConfigService,private jwtservice:JwtService){}
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

    @Post('/sign-in')
    async signIn(@Body()body:SignInDTO,@Res()res:Response){

      const user=await this.userSerive.findOneByEmail(body.email.toLowerCase())
      if(!user){
       throw new HttpException("Email or Password Not Mactched",HttpStatus.BAD_REQUEST)
    }
     const {password,...payload}=user.toObject()
    const checkPassword = await bcrypt.compare(body.password,password);
    if (!checkPassword) {
      throw new HttpException(
        'Email or Password Not Mactched',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token=await this.tokenSerive.tokenGenrated(payload)
    const accessIn=this.jwtservice.decode(token.access)
    const refreshIn=this.jwtservice.decode(token.refresh)
    res.status(HttpStatus.ACCEPTED).json({
      statusCode:HttpStatus.ACCEPTED,
      message:"Sign-in Successfully",
      data:{
        user:payload,
        token:{...token},
        expire:{
           accessIn:accessIn.exp ,
           refreshIn:refreshIn.exp 
        }

      }
    })
  }
}