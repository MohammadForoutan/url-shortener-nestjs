import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { envConfig } from '../env';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: envConfig.LOG_LEVEL,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'HH:MM:ss yyyy-mm-dd',
            messageFormat: '{levelLabel} {hostname} [{context}] {msg}',
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
