import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { EventsRoutingModule, routedComponents } from './events-routing.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { CategorieFilterPipe } from '../../pipes/categorie/categorie-filter.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { GroupsFilterPipe } from '../../pipes/groups/groups-filter.pipe';


@NgModule({
  imports: [
    ThemeModule,
    EventsRoutingModule,
    NgSelectModule,
    FormsModule
    
  ],
  declarations: [
    ...routedComponents, CategorieFilterPipe, GroupsFilterPipe
  ],
  providers:[]
})
export class EventsModule { }
