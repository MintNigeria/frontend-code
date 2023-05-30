import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nigeriaPhoneNumber'
})
export class NigeriaPhoneNumberPipe implements PipeTransform {

  transform(number: any) {
    number = number.replace(/\D/g, '');
    if (number.length == 11) {
      return '+234 ' + number.slice(1);
    } else if (number.length == 10) {
      return '+234 ' + number;
    } else {
      return number;
    }
  }

}
