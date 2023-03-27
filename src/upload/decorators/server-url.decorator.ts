import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ServerUrl = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return `${req.protocol}://${req.get('host')}/public/images/`;
  },
);
