import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";

export class SignInDTO{
@IsNotEmpty()
@IsEmail() 
email:string

@IsNotEmpty()
@IsStrongPassword()
password:string
}