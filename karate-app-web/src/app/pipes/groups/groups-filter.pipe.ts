import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";
import { Group } from '../../models/group';


@Pipe({
  name: 'groupsFilter'
})
export class GroupsFilterPipe implements PipeTransform {

  transform(items: Array<Group>, filter: string): any {
    console.log('hey')
    if(!items || !filter) {
      return items;
    }
    return items.filter(item => "blue" == item.side);
  }

}
