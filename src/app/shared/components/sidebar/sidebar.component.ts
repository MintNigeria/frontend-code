import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { isUserSelector } from 'src/app/store/auth/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
@Input() menuLinks : any[] = []
 
user$ = this.appStore.pipe(select(isUserSelector));

  
  
  continuDownloadId = 'addContinueDownloadModal';
  currentRoute!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private appStore: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url.split('/')[1]
    //console.log(this.currentRoute, this.router.url.split('/')[1])
  }

  goToPath(path: any, hasChild: boolean) {
    if (hasChild === true ) {
      return
    } else {

      this.router.navigate([`${this.currentRoute}`, `${path}`]);
    }
  }
 


  logout(path: string) {
    if (path == 'settings' || path == 'settings/my-settings') {
      this.router.navigate([`/main/${path}`]);
    } else {
      this.openLogoutModal();
    }
  }

  openLogoutModal() {
    const dialogRef = this.dialog.open(LogoutModalComponent, {
      // width: '600px',
      // height: '600px'
    });
  }

}
