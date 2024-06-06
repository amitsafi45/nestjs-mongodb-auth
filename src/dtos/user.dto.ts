import { IsArray, IsEmail, IsEnum, IsIn, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { GENDER ,ROLE} from 'src/constants/enum';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender:GENDER

  @IsOptional()
  @IsEnum(ROLE,{each:true})
  @IsArray()
  role?:ROLE
}