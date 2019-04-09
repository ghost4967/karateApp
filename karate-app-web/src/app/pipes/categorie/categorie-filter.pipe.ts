import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";


@Pipe({
  name: 'categorieFilter'
})
export class CategorieFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if(!items || !filter) {
      return items;
    }
    return items.filter(item => item.gender == filter);
  }

}
