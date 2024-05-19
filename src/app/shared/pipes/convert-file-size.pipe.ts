import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFileSize'
})
export class ConvertFileSizePipe implements PipeTransform {

  transform(fileSize?: number | null, measureUnit = 'kB'): string {
    switch (measureUnit) {
      case 'kB':
        return fileSize ? (+fileSize / 1024).toFixed(1) : '0';
    }
    return '';
  }

}
