import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";

export class SignInDTO{
@ApiProperty()
@IsNotEmpty()
@IsEmail() 
email:string

@ApiProperty()
@IsNotEmpty()
@IsStrongPassword()
password:string
}