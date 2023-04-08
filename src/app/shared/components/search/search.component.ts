import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
@Input() placeholder!: string
@Output() keyupEnter = new EventEmitter<any>();
@Input() formCtrlName!: any;
@Input() formGrp!: FormGroup;

@Output() iconSearch = new EventEmitter<any>();

constructor() { }

ngOnInit(): void {
}

sendInput(input: any) {
  if (input.target.value) {
    this.keyupEnter.emit(input.target.value);
    // return (this.value = null);
  }

}


iconClick(key: any) {
  this.iconSearch.emit(key);

}



}
