import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string): number {
    const today = new Date();
    const dob = new Date(value);

    let age = today.getFullYear() - dob.getFullYear();
    const montDiff = today.getMonth() - dob.getMonth();

    if (montDiff < 0 || (montDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }
}
