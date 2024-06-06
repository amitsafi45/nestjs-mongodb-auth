import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { userProvider } from "src/providers/user.provider";
import { AuthController } from "src/controllers/auth/auth.controllers";
import { UserService } from "src/services/user.service";
@Module({
  imports: [DatabaseModule,],
  controllers: [AuthController],
  providers: [...userProvider,UserService],
})
export class AuthModule{}