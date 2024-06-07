import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../roles.decorator';
import { ROLE } from 'src/constants/enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasCommonRole = user.role.some((assginRole: ROLE) =>
      roles.includes(assginRole),
    );
    if (hasCommonRole) {
      return true;
    }
    throw new HttpException(
      'You have no access to this resource',
      HttpStatus.FORBIDDEN,
    );
  }
}
