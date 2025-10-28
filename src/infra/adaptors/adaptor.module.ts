import {
  EmailService,
  HashService,
  JwtServicePort,
} from '@app/application/ports';
import { Module } from '@nestjs/common';

import { EmailServiceImp } from './email.service';
import { HashServiceImp } from './hash.service';
import { JwtServiceImp } from './jwt.service';

@Module({
  imports: [],
  providers: [
    {
      provide: HashService,
      useClass: HashServiceImp,
    },
    {
      provide: EmailService,
      useClass: EmailServiceImp,
    },
    {
      provide: JwtServicePort,
      useClass: JwtServiceImp,
    },
  ],
  exports: [EmailService, HashService, JwtServicePort],
})
export class AdaptorModule {}
