import type { Sender, SendResult } from '../notification.types';

export class SmsSender implements Sender {
  async send(to: string, message: string): Promise<SendResult> {
    console.log(`[sms] to=${to} message=${message} by sms`);
    // A real provider (e.g. Twilio) returns { sid }; map it to `id` here.
    return { id: crypto.randomUUID(), provider: 'twilio', status: 'sent' };
  }
}
