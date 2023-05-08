import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const UserRoles = (...args: string[]): CustomDecorator =>
  SetMetadata('roles', args);
