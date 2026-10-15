import { Notifier } from './notifier';
import { SmsSender } from './senders/sms.sender';

export class SmsNotifier extends Notifier {
  protected createSender() {
    return new SmsSender();
  }
}
