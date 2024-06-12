import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDTO } from 'src/dtos/user.dto';
import { IToken } from 'src/interfaces/token.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from 'src/schemas/token.schema';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('TOKEN_MODEL') private tokenModel: Model<Token>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(data: IToken) {
    return (await this.tokenModel.create(data)).save();
  }

  async findOneByTokenAndId(token: string, user: UserDTO) {
    return await this.tokenModel.findOne({
      token: token,
      user: user,
    });
  }

  async tokenGenrated(payload): Promise<{ access: string; refresh: string }> {
    return {
      access: await this.jwtService.signAsync(
        {
          sub: payload._id,
          email: payload.email,
          role: payload.role,
        },
        {
          secret: this.configService.get('ACCESS_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      ),
      refresh: await this.jwtService.signAsync(
        {
          sub: payload._id,
          email: payload.email,
          role: payload.role,
        },
        {
          secret: this.configService.get('REFRESH_SECRET_KEY'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        },
      ),
    };
  }
}
