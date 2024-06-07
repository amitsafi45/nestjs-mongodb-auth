import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ROLE } from 'src/constants/enum';
import { AuthorizationGuard } from 'src/utils/guard/authorization.guard';
import { Roles } from 'src/utils/roles.decorator';

@Controller('/test')
@ApiBearerAuth()
export class TestController {
  @Get('/admin')
  @UseGuards(AuthorizationGuard)
  @Roles([ROLE.Admin])
  async adminApi(@Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).json({
      statusCode: HttpStatus.ACCEPTED,
      message: 'Admin api',
    });
  }
  @Get('/member')
  @UseGuards(AuthorizationGuard)
  @Roles([ROLE.Member])
  async memberApi(@Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).json({
      statusCode: HttpStatus.ACCEPTED,
      message: 'Member api',
    });
  }

  @Get('/super-admin')
  @UseGuards(AuthorizationGuard)
  @Roles([ROLE.Super_Admin])
  async superAdminApi(@Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).json({
      statusCode: HttpStatus.ACCEPTED,
      message: 'Super admin api',
    });
  }
}
