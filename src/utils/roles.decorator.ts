import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/constants/enum';

export const Roles = Reflector.createDecorator<ROLE[]>();