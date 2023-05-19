import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { HelpDeskComponent } from 'src/app/shared/components/help-desk/help-desk.component';
import { LogoutModalComponent } from 'src/app/shared/components/logout-modal/logout-modal.component';
import { TimerService } from 'src/app/shared/util/timer.service';
import { isUserSelector, permissionsSelector } from 'src/app/store/auth/selector';
import { getNotification } from 'src/app/store/notification/action';
import { notificationSelector } from 'src/app/store/notification/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {
  menuLinks = [
    {
      id: 1,
      title: 'Dashboard',
      label: 'Dashboard',
      hasChild: false,
      path: 'dashboard',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
      show: false,
    },
    {
      id: 2,
      title: 'Requests',
      label: 'Requests',
      hasChild: true,
      path: 'requests',
      active: 'assets/images/request-active.svg',
      inactive: 'assets/images/request-active.svg',
      show: false,
      childRoute:  [
        {
          route: '/institution/requests',
          name: 'Graduate'
        },
        {
          route: '/institution/requests/organization',
          name: 'Organization'
        }
      ]
    },
    {
      id: 2,
      title: 'Records',
      label: 'Records',
      hasChild: false,
      path: 'records',
      active: 'assets/images/gradaute-active.svg',
      inactive: 'assets/images/graduate-active.svg',
      show: false,
      childRoute:  [
        {
          route: 'approved',
          name: 'Approved'
        },
        {
          route: 'pending',
          name: 'Pending'
        }
      ]
    },
    {
      id: 3,
      title: 'Uploads',
      label: 'Uploads',
      hasChild: false,
      path: 'uploads',
      active: 'assets/images/institution-inactive.svg',
      inactive: 'assets/images/institution-inactive.svg',
      show: false,
    },
    {
      id: 4,
      title: 'Reports',
      label: 'Reports',
      hasChild: false,
      path: 'reports',
      active: 'assets/images/reports.svg',
      inactive: 'assets/images/reports.svg',
      show: false,
    },
    {
      id: 5,
      title: 'Transactions',
      label: 'Transactions',
      hasChild: false,
      path: 'transactions',
      active: 'assets/images/organization-inactive.svg',
      inactive: 'assets/images/organization-inactive.svg',
      show: false,
    },
    {
      id: 6,
      title: 'Configuration',
      label: 'Configuration',
      hasChild: false,
      path: 'configuration',
      active: 'assets/images/config-inactive.svg',
      inactive: 'assets/images/config-inactive.svg',
      show: false,
    },
    // {
    //   id: 7,
    //   title: 'Users and Roles',
    //   hasChild: false,
    //   path: 'users-and-roles',
    //   active: 'assets/images/role-inactive.svg',
    //   inactive: 'assets/images/role-inactive.svg',
    // },
  ];
  deviceModel: string;
  ipAddress: any;
  permissionList: any;
  adminUser: any;
  permission$ = this.appStore.pipe(select(permissionsSelector));
  // user$ = this.appStore.pipe(select(isUserSelector));
  notification$ = this.appStore.pipe(select(notificationSelector))
  superAdminRole: any;
  userData: any;
  userId!: number;
user: any
  constructor(
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private appStore: Store<AppStateInterface>,
    private dialog: MatDialog,
    private store: Store,
    private timer: TimerService



  ) {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      this.deviceModel = 'iPad or iPhone';
    } else if (userAgent.match(/Android/i)) {
      this.deviceModel = 'Android';
    } else if (userAgent.match(/Window/i)) {
      this.deviceModel = 'Window';
    } else {
      this.deviceModel = 'Other';
    }
    this.loadIp();
    const data: any = localStorage.getItem('authData')
    this.user = JSON.parse(data)
  
        this.superAdminRole = this.user.user.role.split('|')[0]
   }

  ngOnInit(): void {
    setTimeout(() => {
      const extra = {
        device: this.deviceModel,
    ipAddress: this.ipAddress
      }
      sessionStorage.setItem('extras', JSON.stringify(extra))
    }, 2000);
    // this.users()
    this.permissions()
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.appStore.pipe(select(isUserSelector)).subscribe((res)=> {
      this.userId = Number(res?.id)
    })
    this.store.dispatch(getNotification({entityId: this.userData.InstitutionId, userType: 2}))

  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  // users() {
  //   this.user$.subscribe((res: any) => {

  //   })
  // }
  permissions() {
    this.permission$.subscribe((res: any) => {
      this.permissionList = res

    })
  }

  openLogoutModal() {
    const dialogRef = this.dialog.open(LogoutModalComponent, {
      // width: '600px',
      // height: '600px'
    });
  }
  
  openHelpDesk() {
    const dialogRef = this.dialog.open(HelpDeskComponent, {
      width: '500px',
      height: 'auto',
      data: {userType: 2},
      disableClose: true,

    });
    
  }


  openMobileNav() {
    const el: any = document.getElementById('targetEl');
    el.classList.toggle('showMobileNav')
    console.log('test', el)
  }
  
  closeNav(event: any) {
    console.log(event)
    if (event.close === 'true') {

      const el: any = document.getElementById('targetEl');
      el.classList.remove('showMobileNav')

    }
  }

}
