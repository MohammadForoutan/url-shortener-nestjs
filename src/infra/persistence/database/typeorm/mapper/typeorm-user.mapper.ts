import { User } from '@app/domain/user/entities';
import { Password } from '@app/domain/user/value-objects';

import type { UserEntity as TypeormUserEntity } from '../entities/user.entity';

export class TypeormUserMapper {
  static toDomain(userEntity: TypeormUserEntity): User {
    return User.create({
      id: userEntity.id,
      email: userEntity.email,
      password: Password.fromValid(userEntity.password),
      verificationToken: userEntity.verificationToken,
      isEmailVerified: userEntity.isEmailVerified,
      verificationTokenExpiresAt: userEntity.verificationTokenExpiresAt,
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
      verificationTokenExpiresAt: user.verificationTokenExpiresAt,
      passwordResetToken: user.passwordResetToken,
      passwordResetTokenExpiresAt: user.passwordResetTokenExpiresAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
