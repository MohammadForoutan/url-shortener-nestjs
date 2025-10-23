import { EmailService } from '@app/application/url-shortener/interfaces/email-service.interface';
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
export class EmailModule {}
