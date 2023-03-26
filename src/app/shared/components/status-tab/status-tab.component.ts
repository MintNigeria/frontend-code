import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-tab',
  templateUrl: './status-tab.component.html',
  styleUrls: ['./status-tab.component.scss']
})
export class StatusTabComponent implements OnInit {

  @Input() text!: string;
  @Input() status!: any;

  constructor() { }

  ngOnInit(): void {
  }

  get statusClass() {
    return this.status === 1 ? 'bg-successNormal text-successNormal ' : 'bg-failedDark text-failedDark';
  }

  get tabClass() {
    return this.status === 1 ? 'bg-successLight' : 'bg-failedLight';
  }

}
