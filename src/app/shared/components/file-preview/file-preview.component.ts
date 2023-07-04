import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {
  @ViewChild('printArea', { static: false }) printAreaRef!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FilePreviewComponent>,

  ) { 
    // dialogRef.disableClose = false;
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();

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
    // const printContents = this.printAreaRef.nativeElement.innerHTML;
    // const originalContents = document.body.innerHTML;
    // const printWindow : any = window.open('', '');
    // printWindow.document.open();
    // printWindow.document.write(`
    //   <html>
    //     <head>
    //       <style>
    //         @media print {
    //           @page {
    //             size: 200px 300px; /* Specify the desired dimensions here */
    //             margin: 10mm;
    //           }
    //         }
    //       </style>
    //     </head>
    //     <body>${printContents}</body>
    //   </html>
    // `);
    // printWindow.document.close();
    // printWindow.print();
    // printWindow.close();

    window.print()
    // document.body.innerHTML = originalContents;


    //     const printDialog = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
//     printDialog.document.write(printRange.innerHTML)
//     printDialog.focus();
// printDialog.print();
  }

}
