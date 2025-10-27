import type { User } from '@app/domain/user/entities';

import { ApiProperty } from '@nestjs/swagger';

export class UserReadModel {
  @ApiProperty({
    description: 'The id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  email: string;
  @ApiProperty({
    description: 'The created at of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'The updated at of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email.value;
    this.createdAt = user.createdAt ?? new Date();
    this.updatedAt = user.updatedAt ?? new Date();
  }
}
