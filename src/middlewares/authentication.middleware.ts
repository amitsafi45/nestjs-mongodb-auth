import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.get('authorization').replace('Bearer', '').trim();
      const user = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get('ACCESS_SECRET_KEY'),
      });
      req['user'] = user;
      return next();
    } catch (error) {
      throw new HttpException('Unauthorized User', HttpStatus.UNAUTHORIZED);
    }
  }
}
