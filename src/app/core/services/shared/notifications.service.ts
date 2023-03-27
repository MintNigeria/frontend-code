import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/types/index.types';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  // type: string = 'default' | ''
  /**
   * Constructor
   *
   * @param {NotifierService} notifier Notifier service
   */
  constructor(private _notifier: NotifierService) {}

  /**
   * Show a notification
   *
   * @param {string} type    Notification type
   * @param {string} message Notification message
   */
  publishMessages(type: NotificationType, message: string): void {
    //console.log(message);
    this._notifier.notify(type, message);
  }

  dismissMessage() {
    this._notifier.hideAll();
  }
}
