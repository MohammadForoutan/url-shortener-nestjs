import { EmailService } from '@app/application/url-shortener/ports';
import { Module } from '@nestjs/common';

import { EmailServiceImp } from './email.service';

@Module({
  imports: [],
  providers: [
    {
      provide: EmailService,
      useClass: EmailServiceImp,
    },
  ],
  exports: [EmailService],
})
export class AdaptorModule {}
