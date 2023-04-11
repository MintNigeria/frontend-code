import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { isUserSelector, permissionsSelector } from 'src/app/store/auth/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
@Input() menuLinks : any[] = []
 
user$ = this.appStore.pipe(select(isUserSelector));
permission$ = this.appStore.pipe(select(permissionsSelector));

  
  
  continuDownloadId = 'addContinueDownloadModal';
  currentRoute!: any;
  permissionList: any;
  adminUser: any;
  superAdminRole: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private appStore: Store<AppStateInterface>
  ) {

    this.permissions()
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url.split('/')[1]

    this.getUser()
    this.activeLink();

    ////console.log(this.currentRoute, this.router.url.split('/')[1])
  }

  

  getUser() {
    this.user$.subscribe((res: any) => {
      this.adminUser = res;
      console.log(this.adminUser.role.split('|')[0])
    })
  }
  permissions() {
    this.permission$.subscribe((res: any) => {
      this.permissionList = res;
    })
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

  activeLink() {
    this.menuLinks.filter((link) => {
      const title = link.label.replace(' ', '_').toUpperCase()
      const newTitle = `INSTITUTION_${title}`
      if (this.permissionList?.includes(newTitle)) {
        link.show = true;
      } else if (this.adminUser.userType === 'Graduates' || this.adminUser.userType === 'Organization') {
        link.show = true;
      } else if (this.adminUser.role.split('|')[0] === 'Super Admin' || this.adminUser.role === 'undefined') { //admin has no role
        link.show = true;

      }
     
    });
  }

}
