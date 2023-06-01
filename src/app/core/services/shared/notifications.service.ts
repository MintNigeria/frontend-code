import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  message!: string;
  notification: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  alertStatus: BehaviorSubject<{
    style: string;
    content: string;
    show: boolean;
  }> = new BehaviorSubject<{
    content: string;
    style: string;
    show: boolean;
  }>({ style: 'info', content: 'testing',  show: false });

  publishMessages(style: string, content: string) {
    this.alertStatus.next({
      style,
      content,
      show: true,
    });
    setTimeout(() => {
      this.dismissMessage();
    }, 9000);
  }

  dismissMessage() {
    this.alertStatus.next({ style: 'info', content: '',  show: false });
  }
}