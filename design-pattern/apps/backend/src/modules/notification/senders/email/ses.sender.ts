import type { Sender, SendResult } from '../../notification.types';

export class SesSender implements Sender {
  async send(to: string, message: string): Promise<SendResult> {
    console.log(`[email:ses] to=${to} message=${message}`);
    // Stub. A real call returns { MessageId }; map it to `id` here.
    return { id: crypto.randomUUID(), provider: 'ses', status: 'sent' };
  }
}
