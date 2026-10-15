import type { Request, Response } from 'express';
import { EMAIL_PROVIDERS, isEmailProvider } from '../config/email';
import {
  getEmailProvider,
  setEmailProvider,
} from '../modules/settings/email-settings';

export async function getEmailSetting(_req: Request, res: Response) {
  res.json({ provider: await getEmailProvider(), providers: EMAIL_PROVIDERS });
}

export async function putEmailSetting(req: Request, res: Response) {
  const provider = req.body?.provider;
  if (!isEmailProvider(provider)) {
    res
      .status(400)
      .json({ error: `provider must be one of ${EMAIL_PROVIDERS.join(', ')}` });
    return;
  }
  await setEmailProvider(provider);
  res.json({ provider, providers: EMAIL_PROVIDERS });
}
