import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  countdown: string = '';
days: any;
hours: any;
minutes: any;
seconds: any;
  constructor() { }

  ngOnInit(): void {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000); 
  }

  updateCountdown() {
    const targetDate = new Date('2023-09-14T00:00:00'); 
    const currentDate = new Date();

    const timeDifference = targetDate.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      this.countdown = 'Countdown expired';
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.days  = days;
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.hours  = hours;
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.minutes  = minutes;
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      this.seconds  = seconds;

      this.countdown = `${days} days: ${hours} hours: ${minutes} mins: ${seconds} seconds`;
    }
  }
}
