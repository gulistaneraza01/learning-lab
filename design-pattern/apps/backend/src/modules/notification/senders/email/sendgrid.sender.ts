import type { Sender, SendResult } from '../../notification.types';

export class SendGridSender implements Sender {
  async send(to: string, message: string): Promise<SendResult> {
    console.log(`[email:sendgrid] to=${to} message=${message}`);
    // Stub. A real call returns an x-message-id header; map it to `id` here.
    return { id: crypto.randomUUID(), provider: 'sendgrid', status: 'sent' };
  }
}
