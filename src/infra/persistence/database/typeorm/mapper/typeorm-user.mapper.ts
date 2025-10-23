import { User } from '@app/domain/url-shortener/user';
import { Password } from '@app/domain/url-shortener/value-objects';

import type { UserEntity as TypeormUserEntity } from '../entities/user.entity';

export class TypeormUserMapper {
  static toDomain(userEntity: TypeormUserEntity): User {
    return User.create({
      id: userEntity.id,
      email: userEntity.email,
      password: Password.fromValid(userEntity.password),
      verificationToken: userEntity.verificationToken,
      isEmailVerified: userEntity.isEmailVerified,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    });
  }

  static toTypeorm(user: User): TypeormUserEntity {
    return {
      id: user.id,
      email: user.email.value,
      password: user.password.value,
      isEmailVerified: user.isEmailVerified,
      verificationToken: user.verificationToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
