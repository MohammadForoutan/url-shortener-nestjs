import { HashService } from '@app/application/ports';
import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class HashServiceImp implements HashService {
  constructor(@InjectPinoLogger() private readonly pinoLogger: PinoLogger) {}
  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }
  async verifyPassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, rawPassword);
  }
}
