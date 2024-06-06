import { Body, Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body()body:UserDto): string {
    if(body){
      throw new HttpException("jsdjsh",HttpStatus.BAD_REQUEST)
    }
    return this.appService.getHello();
  }
}
