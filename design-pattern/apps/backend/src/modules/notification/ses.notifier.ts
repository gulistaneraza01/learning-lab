import { Notifier } from './notifier';
import { SesSender } from './senders/email/ses.sender';

export class SesNotifier extends Notifier {
  protected createSender() {
    return new SesSender();
  }
}
