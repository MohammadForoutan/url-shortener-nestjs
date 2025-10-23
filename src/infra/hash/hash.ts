import * as argon2 from 'argon2';

interface HashUtilInterface {
  hashPassword: (password: string) => Promise<string>;
  verifyPassword: (
    rawPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}

export const HashUtil: HashUtilInterface = {
  hashPassword: (password: string): Promise<string> => argon2.hash(password),

  verifyPassword: (
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> => argon2.verify(hashedPassword, rawPassword),
};
