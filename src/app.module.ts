import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidate } from './utils/envValidator';
import { DatabaseModule } from './modules/database.module';
import { AuthModule } from './modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal: true,
    validate:envValidate
  })
  ,
  JwtModule.register({
    global: true,
  })
  ,DatabaseModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}

