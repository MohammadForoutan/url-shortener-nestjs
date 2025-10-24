import { UserRepository } from '@app/application/url-shortener/ports/user.repository';
import { User } from '@app/domain/url-shortener/user';
import { Injectable } from '@nestjs/common';
import { MoreThan } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { TypeormUserMapper } from '../mapper';
import { TypeormUnitOfWork } from '../unit-of-work';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(private readonly unitOfWork: TypeormUnitOfWork) {}
  findByEmail(email: string): Promise<User | null> {
    return this.unitOfWork.doTransactional(async manager => {
      const userEntity = await manager.findOne(UserEntity, {
        where: { email },
      });
      return userEntity ? TypeormUserMapper.toDomain(userEntity) : null;
    });
  }

  findById(userId: string): Promise<User | null> {
    return this.unitOfWork.doTransactional(async manager => {
      const userEntity = await manager.findOne(UserEntity, {
        where: { id: userId },
      });
      return userEntity ? TypeormUserMapper.toDomain(userEntity) : null;
    });
  }

  async create(user: User): Promise<User> {
    return this.unitOfWork.doTransactional(async manager => {
      const userEntity = manager.create(
        UserEntity,
        TypeormUserMapper.toTypeorm(user),
      );
      const savedUserEntity = await manager.save(userEntity);
      return TypeormUserMapper.toDomain(savedUserEntity);
    });
  }

  findByVerificationToken(verificationToken: string): Promise<User | null> {
    return this.unitOfWork.doTransactional(async manager => {
      const userEntity = await manager.findOne(UserEntity, {
        where: { verificationToken },
      });
      return userEntity ? TypeormUserMapper.toDomain(userEntity) : null;
    });
  }
  findByPasswordResetToken(passwordResetToken: string): Promise<User | null> {
    return this.unitOfWork.doTransactional(async manager => {
      const userEntity = await manager.findOne(UserEntity, {
        where: {
          passwordResetToken,
          passwordResetTokenExpiresAt: MoreThan(new Date()),
        },
      });
      return userEntity ? TypeormUserMapper.toDomain(userEntity) : null;
    });
  }

  update(user: User): Promise<User> {
    console.log({ user });
    console.log({ userEntity: TypeormUserMapper.toTypeorm(user) });

    return this.unitOfWork.doTransactional(async manager => {
      const userEntity = manager.create(
        UserEntity,
        TypeormUserMapper.toTypeorm(user),
      );
      const savedUserEntity = await manager.save(userEntity);
      return TypeormUserMapper.toDomain(savedUserEntity);
    });
  }
}
