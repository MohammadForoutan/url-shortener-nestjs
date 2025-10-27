import { UserReadModel } from '@app/application/read-models';
import { UrlReadModel } from '@app/application/read-models/url.read-model';
import { Url } from '@app/domain/url/entities';
import { OriginalLink, ShortLink } from '@app/domain/url/value-objects';
import { User } from '@app/domain/user/entities';
import { Password } from '@app/domain/user/value-objects';

const userInput = {
  email: 'test@example.com',
  id: '123e4567-e89b-12d3-a456-426614174000',
  password: Password.fromInput('Password123!s'),
  verificationToken: null,
  verificationTokenExpiresAt: null,
  isEmailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const urlInput = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  originalUrl: OriginalLink.fromInput('https://www.google.com').value,
  shortUrl: ShortLink.fromInput('my custom url'),
  isCustom: true,
  clickCount: 0,
  expirationDate: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: User.create(userInput),
};
export const mockReadModels = {
  user: new UserReadModel(User.create(userInput)),
  url: new UrlReadModel(Url.create(urlInput)),
};
