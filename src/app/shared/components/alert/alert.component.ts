import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  
  notification: any;
  constructor(private alert: NotificationsService) {}

  ngOnInit() {
    this.alert.alertStatus.subscribe((res) => {
      //  (res);
      this.notification = res;
    });
  }

  dismiss() {
    this.alert.dismissMessage();
  }


}
