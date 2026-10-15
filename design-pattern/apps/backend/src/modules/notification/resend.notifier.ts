import { Notifier } from './notifier';
import { ResendSender } from './senders/email/resend.sender';

export class ResendNotifier extends Notifier {
  protected createSender() {
    return new ResendSender();
  }
}
