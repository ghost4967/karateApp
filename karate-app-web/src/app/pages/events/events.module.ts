import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { EventsRoutingModule, routedComponents } from './events-routing.module';
import { CreateEventComponent } from './create-event/create-event.component';

@NgModule({
  imports: [
    ThemeModule,
    EventsRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class EventsModule { }
