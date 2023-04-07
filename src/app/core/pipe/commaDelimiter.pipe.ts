import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaDelimiter'
})
export class CommaDelimiterPipe implements PipeTransform {

  transform(value: any): any {
    

    return `${value?.toLocaleString(undefined, {maximumFractionDigits: 2,})}`;
  }


}
