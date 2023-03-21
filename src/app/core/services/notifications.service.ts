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
    content: string;
    style: string;
    show: boolean;
  }> = new BehaviorSubject<{
    content: string;
    style: string;
    show: boolean;
  }>({ content: 'testing', style: 'info', show: false });

  publishMessages(content: string, style: string) {
    this.alertStatus.next({
      content,
      style,
      show: true,
    });
    setTimeout(() => {
      this.dismissMessage();
    }, 10000);
  }

  dismissMessage() {
    this.alertStatus.next({ content: '', style: 'info', show: false });
  }
}