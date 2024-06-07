import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { userProvider } from "src/providers/user.provider";
import { AuthController } from "src/controllers/auth.controller";
import { UserService } from "src/services/user.service";
import { TokenModule } from "./token.module";
@Module({
  imports: [DatabaseModule,TokenModule],
  controllers: [AuthController],
  providers: [...userProvider,UserService],
})
export class AuthModule{}