import { UserReadModel } from '@app/application/url-shortener/read-model';
import { UrlReadModel } from '@app/application/url-shortener/read-model/url.read-model';
import { Url } from '@app/domain/url-shortener/url';
import { User } from '@app/domain/url-shortener/user';
import {
  OriginalLink,
  Password,
  ShortLink,
} from '@app/domain/url-shortener/value-objects';
import { nanoid } from 'nanoid';

const userInput = {
  email: 'test@example.com',
  id: '123e4567-e89b-12d3-a456-426614174000',
  password: Password.fromInput('Password123!s'),
  verificationToken: null,
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
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: User.create(userInput),
};
export const mockReadModels = {
  user: new UserReadModel(User.create(userInput)),
  url: new UrlReadModel(Url.create(urlInput)),
};
