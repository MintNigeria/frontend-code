import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuLinks = [
    {
      id: 1,
      title: 'Dashboard',
      path: 'dashboard',
      active: 'assets/images/main/dashboardActive.svg',
      inactive: 'assets/images/main/dashboardInactive.svg',
    },
    {
      id: 2,
      title: 'Order',
      path: 'orders',
      active: 'assets/images/main/orderActive.svg',
      inactive: 'assets/images/main/orderInactive.svg',
    },
    {
      id: 3,
      title: 'Offerings',
      path: 'offerings',
      active: 'assets/images/main/offeringActive.svg',
      inactive: 'assets/images/main/ordersInactive.svg',
    },
    {
      id: 4,
      title: 'Patients',
      path: 'patients',
      active: 'assets/images/main/customersActive.svg',
      inactive: 'assets/images/main/patientsInactive.svg',
    },
    {
      id: 5,
      title: 'Financial Analytics',
      path: 'financial-analytics',
      active: 'assets/images/main/financialActive.svg',
      inactive: 'assets/images/main/financialsInactive.svg',
    },
    {
      id: 6,
      title: 'Clinic and Staffs',
      path: 'clinic-and-staffs',
      active: 'assets/images/main/clinicActive.svg',
      inactive: 'assets/images/main/clinicInactive.svg',
    },
    {
      id: 7,
      title: 'Appointments',
      path: 'appointments',
      active: 'assets/images/main/appointmentActive.svg',
      inactive: 'assets/images/main/appointmentInactive.svg',
    },
    {
      id: 8,
      title: 'Order Supplies',
      path: 'order-supplies',
      active: 'assets/images/main/suppliesActive.svg',
      inactive: 'assets/images/main/suppliesInactive.svg',
    },
  ];
  secondaryLinks = [
    {
      id: 1,
      title: 'Settings',
      // path: this.adminService.isUserAdmin()
      //   ? 'settings'
      //   : 'settings/my-settings',
      active: 'assets/images/main/Settings.svg',
      inactive: 'assets/images/main/Settings.svg',
    },
    {
      id: 2,
      title: 'Logout',
      path: '',
      active: 'assets/images/main/logout.svg',
      inactive: 'assets/images/main/logout.svg',
    },
  ];
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
