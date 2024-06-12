import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AuthController } from 'src/controllers/auth.controller';
import { UserService } from 'src/services/user.service';
import { TokenModule } from './token.module';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from 'src/schemas/user.schema';
@Module({
  imports: [TokenModule,MongooseModule.forFeature([{
    name: "USER_MODEL",
    schema:UserSchema 
  }]),
  ],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
