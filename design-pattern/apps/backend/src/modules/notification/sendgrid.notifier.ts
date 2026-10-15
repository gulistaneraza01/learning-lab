import { Notifier } from './notifier';
import { SendGridSender } from './senders/email/sendgrid.sender';

export class SendGridNotifier extends Notifier {
  protected createSender() {
    return new SendGridSender();
  }
}
