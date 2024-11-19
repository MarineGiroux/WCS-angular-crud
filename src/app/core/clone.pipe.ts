import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clone',
  standalone: true
})
export class ClonePipe implements PipeTransform {

  transform(object: unknown, ...args: unknown[]): any {
    return structuredClone(object);
  }

}
