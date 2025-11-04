export const MSG = {
  LOGIN_SUCCESS: 'User logged in successfully',
  REGISTER_SUCCESS: 'User registered successfully',
  VERIFY_EMAIL_SUCCESS: 'Email verified successfully',
  RESEND_VERIFICATION_EMAIL_SUCCESS: 'Verification email sent successfully',
  FORGOT_PASSWORD_SUCCESS: 'Password reset email sent successfully',
  RESET_PASSWORD_SUCCESS: 'Password reset successfully',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  EMAIL_ALREADY_VERIFIED: 'Email already verified',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  PASSWORD_RESET_TOKEN_EXPIRED: 'Password reset token expired',
  USER_ALREADY_EXISTS: 'User already exists',
} as const;

export type MSG = (typeof MSG)[keyof typeof MSG];
