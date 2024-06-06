import { ArrayMinSize, IsArray, IsEmail, IsEnum, IsIn, IsNotEmpty, IsOptional, IsStrongPassword, Length, ValidateIf } from 'class-validator';
import { GENDER ,ROLE} from 'src/constants/enum';

export class UserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender:GENDER

  @IsOptional()
  @IsArray()
  @IsEnum(ROLE, { each: true })
  @ArrayMinSize(1)
  role?: ROLE[]; // Role is optional and can be undefined
}


