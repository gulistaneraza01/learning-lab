import {
  getDefaultEmailProvider,
  isEmailProvider,
  type EmailProvider,
} from '../../config/email';
import { prisma } from '../../lib/prisma';

const SETTING_ID = 1;

// DB value wins; env/default is the fallback when nothing is saved yet.
export async function getEmailProvider(): Promise<EmailProvider> {
  const row = await prisma.emailSetting.findUnique({ where: { id: SETTING_ID } });
  return row && isEmailProvider(row.provider)
    ? row.provider
    : getDefaultEmailProvider();
}

export async function setEmailProvider(provider: EmailProvider) {
  await prisma.emailSetting.upsert({
    where: { id: SETTING_ID },
    update: { provider },
    create: { id: SETTING_ID, provider },
  });
}
