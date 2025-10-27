export interface JwtPayload {
  userId: string;
  email: string;
}
export abstract class JwtServicePort {
  abstract sign(payload: JwtPayload): Promise<string>;
  abstract verify(token: string): Promise<JwtPayload>;
}
