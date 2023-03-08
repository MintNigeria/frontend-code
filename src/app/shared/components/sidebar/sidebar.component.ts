import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
@Input() menuLinks : any[] = []
 

  
  
  continuDownloadId = 'addContinueDownloadModal';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  }

  goToPath(path: any) {
    this.router.navigate(['/', 'main', `${path}`]);
  }






  logout(path: string) {
    if (path == 'settings' || path == 'settings/my-settings') {
      this.router.navigate([`/main/${path}`]);
    } else {
      this.openLogoutModal();
    }
  }

  openLogoutModal() {
    // const dialogRef = this.dialog.open(LogoutModalComponent, {
    //   // width: '600px',
    //   // height: '600px'
    // });
  }

}
