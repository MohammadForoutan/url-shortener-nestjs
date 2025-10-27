import { Module } from '@nestjs/common';

import { AdaptorModule } from './adaptors';
import { HttpModule } from './api/http/http.module';
import { LoggerModule } from './logger';
import { PersistenceModule } from './persistence';

@Module({
  imports: [LoggerModule, PersistenceModule, AdaptorModule, HttpModule],
})
export class InfraModule {}
