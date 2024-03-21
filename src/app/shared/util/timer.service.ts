import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router'
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
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());
    this.check();
    
}


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
    const isTimeout = diff < 0;
    // console.log('Diff', diff, isTimeout)

    // const expirationDate = helper.isTokenExpired(String(this.token));
    if (isTimeout)  {
      // console.log('I timed out ', isTimeout)
      this.logOut()
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
      this.reset()
      this.router.navigateByUrl('/')
      this.store.dispatch(logoutAction());
    }
    })
}


}

