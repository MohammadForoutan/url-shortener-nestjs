import { AggregateRoot } from '@app/core/entities/aggregate';
import { generateId } from '@app/core/generate-id.util';
import { nanoid } from 'nanoid';

import { Email } from './value-objects';
import { Password } from './value-objects/password.vo';

export class User extends AggregateRoot<string> {
  public email: Email;
  public createdAt: Date;
  public updatedAt: Date;
  private _password: Password;
  public verificationToken: string | null;
  public isEmailVerified: boolean;
  constructor(props: {
    id: string;
    email: Email;
    password: Password;
    verificationToken: string | null;
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
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: {
    id?: string;
    email: string;
    password: Password;
    verificationToken: string | null;
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
      isEmailVerified: props.isEmailVerified,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
    return user;
  }

  get password(): Password {
    return this._password;
  }

  // TODO: where should I use this?
  generateVerificationToken(): string {
    this.verificationToken = nanoid(16);
    return this.verificationToken;
  }

  verifyEmail(): void {
    this.isEmailVerified = true;
    this.verificationToken = null;
  }
}
