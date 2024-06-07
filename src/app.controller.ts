import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('/ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getPing(): string {
    return this.appService.getPing();
  }
}
