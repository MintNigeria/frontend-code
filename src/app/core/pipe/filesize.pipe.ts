import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value: any, precision: number = 1): any {
    let bytes: number = value ? value : 0;
    let exp: number = (Math.log(bytes) / Math.log(1024)) | 0;
    let result: string = (bytes / Math.pow(1024, exp)).toFixed(precision);

    result = result.replace(/\.(0)+$/, "");

    return result + " " + (exp == 0 ? "B" : "KMGTPEZY"[exp - 1] + "B");
  }


}
