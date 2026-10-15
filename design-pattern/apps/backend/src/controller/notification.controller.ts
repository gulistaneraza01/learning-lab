import type { Request, Response } from 'express';
import type { EmailProvider } from '../config/email';
import { ResendNotifier } from '../modules/notification/resend.notifier';
import { SendGridNotifier } from '../modules/notification/sendgrid.notifier';
import { SesNotifier } from '../modules/notification/ses.notifier';
import type { Channel } from '../modules/notification/notification.types';
import type { Notifier } from '../modules/notification/notifier';
import { SmsNotifier } from '../modules/notification/sms.notifier';
import { getEmailProvider } from '../modules/settings/email-settings';

// These maps only *select* a creator. The pattern is in the subclasses.
const emailNotifiers: Record<EmailProvider, () => Notifier> = {
  resend: () => new ResendNotifier(),
  sendgrid: () => new SendGridNotifier(),
  ses: () => new SesNotifier(),
};

// Email provider is read per request, so a UI change applies immediately.
const notifiers: Record<Channel, () => Promise<Notifier>> = {
  email: async () => emailNotifiers[await getEmailProvider()](),
  sms: async () => new SmsNotifier(),
};

export async function sendNotification(req: Request, res: Response) {
  const { channel, to, message } = req.body ?? {};
  const create = notifiers[channel as Channel];

  console.log({ channel, create });

  if (!create || typeof to !== 'string' || typeof message !== 'string') {
    res
      .status(400)
      .json({ error: 'channel (email|sms), to and message are required' });
    return;
  }
  const notifier = await create();
  const result = await notifier.notify(to, message);
  res.status(202).json(result);
}
