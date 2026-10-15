export const EMAIL_PROVIDERS = ['resend', 'sendgrid', 'ses'] as const;
export type EmailProvider = (typeof EMAIL_PROVIDERS)[number];

export function isEmailProvider(value: unknown): value is EmailProvider {
  return EMAIL_PROVIDERS.includes(value as EmailProvider);
}

// Fallback used when the DB has no saved setting. Throws on an unknown value.
export function getDefaultEmailProvider(): EmailProvider {
  const value = process.env.EMAIL_PROVIDER ?? 'resend';
  if (!isEmailProvider(value)) {
    throw new Error(
      `EMAIL_PROVIDER must be one of ${EMAIL_PROVIDERS.join(', ')}; got "${value}"`,
    );
  }
  return value;
}
