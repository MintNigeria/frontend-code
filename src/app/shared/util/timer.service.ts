import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router'
import { filter } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Store } from "@ngrx/store";
import { logoutAction } from "src/app/store/auth/action";

const MINUTES_UNITL_AUTO_LOGOUT = 5 // in mins
const CHECK_INTERVAL = 5000 // in ms
const STORE_KEY =  'lastAction';
@Injectable(
 {
  providedIn: 'root'
}
)
export class TimerService {
  val: any;
  token: any;
  userData: any;
 public getLastAction() {
    const data: any = localStorage.getItem(STORE_KEY)
    return parseInt(data);
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store,
    ) {
      const data: any = localStorage.getItem('userData')
      this.userData = JSON.parse(data)
  
    this.token = localStorage.getItem('token')
    this.check();
    this.initListener();
    this.initInterval();
    
    localStorage.setItem(STORE_KEY,Date.now().toString());
    // setInterval(() => {
    //   if (this.isIdle()) {
    //     this.lockUser();
    //   }
    // }, 300000 ); // 1 minute in milliseconds
}

// isIdle() {
//   return !document.body.classList.contains('active');
// }

// lockUser() {
//   const currentURL = window.location.href;
//   const path = new URL(currentURL).pathname;
//   // this.router.navigate(['/idle-user'], { queryParams: { returnUrl: path } });

  
// }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
    window.addEventListener("storage",() => this.storageEvt());
    
}

  reset() {
// console.log( this.route.snapshot.queryParams['returnUrl'])

    this.setLastAction(Date.now());

  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    // console.log('difference',diff)
    const isTimeout = diff < 0;
    const helper = new JwtHelperService();

    const expirationDate = helper.isTokenExpired(String(this.token));
    if (expirationDate)  {
      this.logOut()
      // this.router.navigate(['/']);
    }
  }
  storageEvt(){
  this.val = localStorage.getItem(STORE_KEY);
}

logOut() {
  const payload = {
    emailAddress : this.userData.email
  }
  this.authService.logOut(payload).subscribe((res: any) => {
    if (res) {

      localStorage.clear()
      this.router.navigateByUrl('/')
      this.store.dispatch(logoutAction());

    }
    })
}


}

