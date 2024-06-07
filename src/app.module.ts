import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidate } from './utils/envValidator';
import { DatabaseModule } from './modules/database.module';
import { AuthModule } from './modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TestController } from './controllers/testController.controller';
import { TestModule } from './modules/test.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal: true,
    validate:envValidate
  })
  ,
  JwtModule.register({
    global: true,
  }),
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => [
      {
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      },
    ],
  }),

  
  DatabaseModule,AuthModule,TestModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
  useClass: ThrottlerGuard
  }],
})
export class AppModule{}

