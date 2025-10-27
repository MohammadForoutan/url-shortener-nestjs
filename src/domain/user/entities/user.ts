import { AggregateRoot } from '@app/core/entities/aggregate';
import { generateId } from '@app/core/generate-id.util';
import { nanoid } from 'nanoid';

import { Email, Password } from '../value-objects';

export class User extends AggregateRoot<string> {
  public email: Email;
  public createdAt: Date;
  public updatedAt: Date;
  private _password: Password;
  public passwordResetToken: string | null;
  public passwordResetTokenExpiresAt: Date | null;
  public verificationToken: string | null;
  public verificationTokenExpiresAt: Date | null;
  public isEmailVerified: boolean;
  constructor(props: {
    id: string;
    email: Email;
    password: Password;
    verificationToken: string | null;
    verificationTokenExpiresAt: Date | null;
    isEmailVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super();
    this.id = props.id;
    this.email = props.email;
    this._password = props.password;
    this.verificationToken = props.verificationToken;
    this.isEmailVerified = props.isEmailVerified ?? false;
    this.verificationTokenExpiresAt = props.verificationTokenExpiresAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: {
    id?: string;
    email: string;
    password: Password;
    verificationToken: string | null;
    verificationTokenExpiresAt: Date | null;
    isEmailVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): User {
    const id = generateId(props.id);
    const email = Email.fromInput(props.email);
    const password = Password.fromInput(props.password.value);

    const user = new User({
      id,
      email,
      password,
      verificationToken: props.verificationToken,
      verificationTokenExpiresAt: props.verificationTokenExpiresAt,
      isEmailVerified: props.isEmailVerified,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
    return user;
  }

  get password(): Password {
    return this._password;
  }

  setPassword(password: Password): void {
    this._password = password;
  }

  // TODO: where should I use this?
  generateVerificationToken(): string {
    this.verificationToken = nanoid(16);
    this.verificationTokenExpiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24,
    );
    return this.verificationToken;
  }

  expireVerificationToken(): void {
    this.verificationToken = null;
    this.verificationTokenExpiresAt = null;
  }

  isVerificationTokenExpired(): boolean {
    if (!this.verificationTokenExpiresAt) {
      return true;
    }
    return this.verificationTokenExpiresAt.getTime() < Date.now();
  }

  verifyEmail(): void {
    this.isEmailVerified = true;
    this.verificationToken = null;
  }

  generatePasswordResetToken(): string {
    this.passwordResetToken = nanoid(16);
    this.passwordResetTokenExpiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24,
    );

    return this.passwordResetToken;
  }

  expirePasswordResetToken(): void {
    this.passwordResetToken = null;
    this.passwordResetTokenExpiresAt = null;
  }

  isPasswordResetTokenExpired(): boolean {
    if (!this.passwordResetTokenExpiresAt) {
      return true;
    }
    return this.passwordResetTokenExpiresAt.getTime() < Date.now();
  }
}
