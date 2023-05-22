import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { isUserSelector, permissionsSelector } from 'src/app/store/auth/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {
  @Input() menuLinks : any[] = []
 @Output() closeMenu = new EventEmitter
  user$ = this.appStore.pipe(select(isUserSelector));
  permission$ = this.appStore.pipe(select(permissionsSelector));
  
    
    
    continuDownloadId = 'addContinueDownloadModal';
    currentRoute!: any;
    permissionList: any;
    adminUser: any;
    superAdminRole: any;
    submenu: boolean = false
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private dialog: MatDialog,
      private appStore: Store<AppStateInterface>
    ) {
  
      this.permissions()
      const data: any = localStorage.getItem('authData')
      this.adminUser = JSON.parse(data)
    }
  
    ngOnInit(): void {
      this.currentRoute = this.router.url.split('/')[1]
      this.getUser()
      this.activeLink();
  
      ////console.log(this.currentRoute, this.router.url.split('/')[1])
    }
  
    
  
    getUser() {
      this.user$.subscribe((res: any) => {
        // this.adminUser = res;
      })
    }
    permissions() {
      this.permission$.subscribe((res: any) => {
        this.permissionList = res;
      })
    }
  
    goToPath(path: any, hasChild: boolean) {
      if (hasChild === true ) {
        this.closeMenu.emit({close: 'true'})
        return
      } else {
        
        this.router.navigate([`${this.currentRoute}`, `${path}`]);
        this.closeMenu.emit({close: 'true'})
      }
    }
    gotoSubmenu(path: any, ) {
    
      // this.router.navigate([`${this.currentRoute}`, `${path}`]);
      this.closeMenu.emit({close: 'true'})
    }
   
  
  
    logout(path: string) {
     
      this.openLogoutModal();
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
        } else if (this.adminUser.user?.userType === 'Graduates' || this.adminUser.user?.userType === 'Organization') {
          link.show = true;
        } else if (this.adminUser.user.role.split('|')[0] === 'Super Admin' || this.adminUser?.user.role === 'undefined') { //admin has no role
          link.show = true;
  
        }
       
      });
    }

    showSubmenu() {
      this.submenu = !this.submenu
    }

}
