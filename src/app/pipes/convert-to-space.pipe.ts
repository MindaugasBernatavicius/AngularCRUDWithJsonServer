import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpace'
})
export class ConvertToSpacePipe implements PipeTransform {
  transform(value: string, character: string): string {
    // if(value === '') throw new Error();
    return value.replace(new RegExp(character + '+', 'gi'), ' ');
  }
}
