import { Module } from '@nestjs/common';

import { EmailModule } from './email';
import { HttpModule } from './http';
import { LoggerModule } from './logger';
import { PersistenceModule } from './persistence';

@Module({
  imports: [LoggerModule, PersistenceModule, HttpModule, EmailModule],
})
export class InfraModule {}
