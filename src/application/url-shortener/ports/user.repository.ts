import type { User } from '@app/domain/url-shortener/user';

export abstract class UserRepository {
  abstract create: (user: User) => Promise<User>;
  abstract findByEmail: (email: string) => Promise<User | null>;
  abstract findById: (userId: string) => Promise<User | null>;
  abstract findByVerificationToken: (
    verificationToken: string,
  ) => Promise<User | null>;
  abstract update: (user: User) => Promise<User>;
}
