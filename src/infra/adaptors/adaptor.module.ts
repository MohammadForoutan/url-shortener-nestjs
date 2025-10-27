import { EmailService, HashService } from '@app/application/ports';
import { Module } from '@nestjs/common';

import { EmailServiceImp } from './email.service';
import { HashServiceImp } from './hash.service';

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
  ],
  exports: [EmailService, HashService],
})
export class AdaptorModule {}
