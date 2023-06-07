import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-confirmation-modal',
  templateUrl: './action-confirmation-modal.component.html',
  styleUrls: ['./action-confirmation-modal.component.scss']
})
export class ActionConfirmationModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    private dialogRef: MatDialogRef<ActionConfirmationModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();

  }

  continueAction() {
    this.dialogRef.close({continue: true})
  }

}
