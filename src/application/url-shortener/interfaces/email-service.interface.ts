// TODO: FIX THIS INTERFACE
export abstract class EmailService {
  abstract sendVerificationEmail(email: string, token: string): Promise<void>;
}
