import type { ExecutionContext } from '@nestjs/common';

import { createParamDecorator } from '@nestjs/common';

import type { JwtPayload } from '../hash';

export const GetJwtPayload = createParamDecorator(
  (_, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request['payload'];
  },
);
