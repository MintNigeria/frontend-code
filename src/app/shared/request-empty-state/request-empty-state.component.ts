import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-request-empty-state',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './request-empty-state.component.html',
  styleUrls: ['./request-empty-state.component.scss']
})
export class RequestEmptyStateComponent implements OnInit {
  img: string = 'assets/images/my-request/plus.svg';
  @Input() headText! : string
  @Input() subHeadText! : string
  @Input() dataStatus! : string
  @Input() bodyText! : string
  @Output() requestClick = new EventEmitter<boolean>();
  constructor() { }

  handleClick(){
    this.requestClick.emit(true)
  }

  ngOnInit(): void {
  }

}
