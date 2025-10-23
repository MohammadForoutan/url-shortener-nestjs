import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { envConfig } from '../../env';
import { JwtServiceImp } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: envConfig.JWT_SECRET,
      signOptions: { expiresIn: envConfig.JWT_EXPIRES_IN },
    }),
  ],
  providers: [JwtServiceImp],
  exports: [JwtServiceImp],
})
export class JwtModule {}
