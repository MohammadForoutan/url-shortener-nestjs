export abstract class HashService {
  abstract hashPassword: (password: string) => Promise<string>;
  abstract verifyPassword: (
    rawPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}
