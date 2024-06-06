import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { tokenProvider } from "../providers/token.provider";
import { TokenService } from "src/services/token.service";

@Module({
  imports: [DatabaseModule,],
  providers: [...tokenProvider,TokenService],
  exports:[...tokenProvider,TokenService]
})
export class TokenModule{}