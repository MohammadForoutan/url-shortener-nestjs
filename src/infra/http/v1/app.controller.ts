import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { uptime } from 'node:process';

@Controller({
  version: '1',
  path: 'app',
})
@ApiTags('AppV1')
export class AppV1Controller {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('health')
  health() {
    return {
      dateTime: new Date().toISOString(),
      uptime,
    };
  }
}
