import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../../auth/types/types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const request = ctx.switchToHttp().getRequest();
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return request.user as AuthUser;
  },
);
