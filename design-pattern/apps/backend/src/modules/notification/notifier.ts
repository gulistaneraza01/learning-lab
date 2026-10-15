import type { Sender, SendResult } from './notification.types';

// Creator: owns the shared flow, defers *which* Sender to build to subclasses.
export abstract class Notifier {
  // The factory method. Subclasses override it.
  protected abstract createSender(): Sender;

  async notify(to: string, message: string): Promise<SendResult> {
    const sender = this.createSender();
    return sender.send(to, message);
  }
}
