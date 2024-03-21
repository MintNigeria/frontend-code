import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'breakAtFirstComma' })
export class BreakAtFirstCommaPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value; // Handle empty value case
    }
    return value.split(',').join('<br>');
  }
}