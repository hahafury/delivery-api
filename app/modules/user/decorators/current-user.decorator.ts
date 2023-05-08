import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  });
