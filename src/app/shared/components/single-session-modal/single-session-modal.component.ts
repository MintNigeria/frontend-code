import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-single-session-modal',
  templateUrl: './single-session-modal.component.html',
  styleUrls: ['./single-session-modal.component.scss']
})
export class SingleSessionModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SingleSessionModalComponent>,
    private localStorage: StorageService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,


  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    
    this.dialogRef.close();
  }
  
  logOutUser() {
    const payload = {
      emailAddress : this.data.email
    }
    this.authService.logOut(payload).subscribe((res: any) => {
      this.dialogRef.close();
      this.localStorage.clear()
      location.reload()
    })
    
}

}
