import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clone',
  standalone: true // Pipe indépendant, utilisable dans n'importe quel module.
})
export class ClonePipe implements PipeTransform {
  transform(object: unknown, ...args: unknown[]): any {
    return structuredClone(object); // Crée une copie profonde de l'objet.
  }
}