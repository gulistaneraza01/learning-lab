import type { Sender, SendResult } from '../../notification.types';

export class ResendSender implements Sender {
  async send(to: string, message: string): Promise<SendResult> {
    console.log(`[email:resend] to=${to} message=${message}`);
    // Stub. A real call returns { id }; map it to `id` here.
    return { id: crypto.randomUUID(), provider: 'resend', status: 'sent' };
  }
}
