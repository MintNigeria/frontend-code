import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FilePreviewComponent>,

  ) { }

  ngOnInit(): void {
  }

  download(data: any) {
    if (data.contentType === 'application/pdf') {
      const link = document.createElement('a');
      link.download = `${data.fileUploadVM.name}`;
      link.href = 'data:application/pdf;base64,' + data.fileUploadVM.path;
      link.click();
    } else {
      const link = document.createElement('a');
      link.download = `${data.fileUploadVM.name}`;
      link.href = 'data:image/png;base64,' + data.fileUploadVM.path;
      link.click();
  
    }
  }

  print() {
    window.print()
  }

}
