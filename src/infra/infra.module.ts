import { Module } from '@nestjs/common';

import { AdaptorModule } from './adaptors';
import { HttpModule } from './http';
import { LoggerModule } from './logger';
import { PersistenceModule } from './persistence';

@Module({
  imports: [LoggerModule, PersistenceModule, HttpModule, AdaptorModule],
})
export class InfraModule {}
