import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { filter } from "rxjs";
const MINUTES_UNITL_AUTO_LOGOUT = 10 // in mins
const CHECK_INTERVAL = 5000 // in ms
const STORE_KEY =  'lastAction';
@Injectable(
 {
  providedIn: 'root'
}
)
export class TimerService {
  val: any;
 public getLastAction() {
    const data: any = localStorage.getItem(STORE_KEY)
    return parseInt(data);
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());
    router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe((event: any) => {
    // console.log('prev:', event.url);
    // this.previousUrl = event.url;
  });
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

    if (isTimeout)  {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
  storageEvt(){
  this.val = localStorage.getItem(STORE_KEY);
}
}

