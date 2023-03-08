import { Injectable } from "@angular/core";
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from "@angular/common/http";
import {Observable} from 'rxjs'
import {Store} from '@ngxs/store';
import {finalize} from 'rxjs/operators'
import {SetLoaderAction} from 'src/app/store/app.action'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private store: Store){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        Promise.resolve(null).then(() => this.store.dispatch(new SetLoaderAction(true)))
        return next.handle(req).pipe(finalize(() => this.store.dispatch(new SetLoaderAction(false))))
    }

}