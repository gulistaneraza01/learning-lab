export type Channel = 'email' | 'sms';

// Every sender normalizes its provider's response into this one shape.
export interface SendResult {
  id: string;
  provider: string;
  status: 'sent' | 'failed';
}

// Product interface: every concrete sender implements this.
export interface Sender {
  send(to: string, message: string): Promise<SendResult>;
}
