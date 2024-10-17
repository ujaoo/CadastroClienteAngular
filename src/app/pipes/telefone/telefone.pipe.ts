import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {
  transform(value: string, estado: string = ''): string {
    if (!value) return value;

    const digits = value.replace(/\D/g, '');

    let formattedNumber: string;

    if (digits.length === 11) {
      formattedNumber = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else if (digits.length === 10) {
      formattedNumber = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return value;
    }
    if (estado) {
      return `${formattedNumber} (${estado})`;
    }

    return formattedNumber;
  }
}
