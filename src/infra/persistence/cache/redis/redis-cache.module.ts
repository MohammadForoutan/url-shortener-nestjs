import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { envConfig } from '../../../env';

@Module({
  imports: [
    CacheModule.register({
      host: envConfig.REDIS_HOST,
      port: envConfig.REDIS_PORT,
      password: envConfig.REDIS_PASSWORD,
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
