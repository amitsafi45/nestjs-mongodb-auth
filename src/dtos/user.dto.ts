import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { GENDER, ROLE } from 'src/constants/enum';

export class UserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    enum: GENDER,
  })
  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

  @ApiProperty({
    type: 'array',
    enum: ROLE,
    example: [ROLE.Admin, ROLE.Member, ROLE.Super_Admin],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(ROLE, { each: true })
  @ArrayMinSize(1)
  role?: ROLE[]; // Role is optional and can be undefined
}
