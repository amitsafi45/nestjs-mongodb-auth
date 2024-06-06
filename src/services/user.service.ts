import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserDto } from "src/dtos/user.dto";

@Injectable()
export class UserService{
  constructor(@Inject('USER_MODEL') private userModel:Model<UserDto>){}

  async create(user:UserDto){
    const newUser=await this.userModel.create({
        email:user.email,
        password:user.password,
        gender:user.gender,
        role:user.role

    });
    console.log(newUser,"fgsdahjk")
    return  newUser
  }

  async findOneByEmail(email:string){
    return await this.userModel.findOne({
        email:email
      })
  }
 
}