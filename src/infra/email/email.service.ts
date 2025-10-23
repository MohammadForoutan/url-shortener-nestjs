import { EmailService } from '@app/application/url-shortener/interfaces/email-service.interface';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { envConfig } from '../env';

@Injectable()
export class EmailServiceImp implements EmailService {
  constructor(@InjectPinoLogger() private readonly pinoLogger: PinoLogger) {}
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const link = new URL(`${envConfig.APP_URL}/verify-email?token=${token}`);
    this.pinoLogger.info(
      `Sending verification email to ${email} with token ${token},
       Please click the link to verify your email: ${link}`,
    );
    return Promise.resolve();
  }
}
