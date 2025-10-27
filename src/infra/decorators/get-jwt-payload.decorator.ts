import type { JwtPayload } from '@app/application/ports';
import type { ExecutionContext } from '@nestjs/common';

import { createParamDecorator } from '@nestjs/common';

export const GetJwtPayload = createParamDecorator(
  (_, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request['payload'];
  },
);
