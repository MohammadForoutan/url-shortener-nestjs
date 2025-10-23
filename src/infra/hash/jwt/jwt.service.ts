import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

export interface JwtPayload {
  userId: string;
  email: string;
}

@Injectable()
export class JwtServiceImp {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async sign(payload: JwtPayload): Promise<string> {
    return await this.nestJwtService.signAsync(payload);
  }

  async verify(token: string): Promise<JwtPayload> {
    return await this.nestJwtService.verify<JwtPayload>(token);
  }
}
