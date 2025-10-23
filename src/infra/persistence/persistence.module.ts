import { Module } from '@nestjs/common';

import { RedisCacheModule } from './cache';
import { TypeormDatabaseModule } from './database';

@Module({
  imports: [TypeormDatabaseModule, RedisCacheModule],
})
export class PersistenceModule {}
