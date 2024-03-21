import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/shared/util/timer.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private timer: TimerService

  ) { }

  ngOnInit(): void {
  }

}
