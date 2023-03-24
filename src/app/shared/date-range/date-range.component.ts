import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
 range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private dialogRef: MatDialogRef<DateRangeComponent>,

  ) { }

  ngOnInit(): void {
  }

  saveSelection() {
    const {start, end} = this.range.value;
    const payload = {
      start: moment(start).format('y-MM-DD'),
      end: moment(end).format('y-MM-DD'),
    }
    this.dialogRef.close(payload);

  }

}
