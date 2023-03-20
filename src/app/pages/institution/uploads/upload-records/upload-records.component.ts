import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-records',
  templateUrl: './upload-records.component.html',
  styleUrls: ['./upload-records.component.scss']
})
export class UploadRecordsComponent implements OnInit {

  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf", "application/csv", "application/xls","application/xlsx"];
  fileSize = '';
  progress = 0;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
      this.fileSize = this.formatBytes(file.size);
      this.uploadFile(file);
    }
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e: any) => {
      if (e.lengthComputable) {
        this.progress = Math.round((e.loaded / e.total) * 100);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
        // do something with the response
      }
    };

    xhr.open('POST', '/upload');
    xhr.send(formData);
  }

  deleteFile() {
  this.selectedFile = null;
  this.fileSize = '';
  this.progress = 0;
}

}
