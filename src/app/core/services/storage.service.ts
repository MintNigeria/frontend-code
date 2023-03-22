import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    setItem(key: string, value: any): void {
        localStorage.setItem(key, value)
    }

    getItem(key:string): string | undefined  {
        const item:any = window.localStorage.getItem(key);
        return item
    }

    removeItem(key: string) {
        localStorage.removeItem(key)
    }

    clear() {
        localStorage.clear()
    }
}