import { Module, } from '@nestjs/common';
import { TokenService } from 'src/services/token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from 'src/schemas/token.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:"TOKEN_MODEL",schema:TokenSchema}])],
  providers: [TokenService],
  exports: [ TokenService],
})
export class TokenModule {}
