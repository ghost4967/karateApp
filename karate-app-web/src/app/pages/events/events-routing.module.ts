import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [{
  path: '',
  component: EventsComponent,
  children: [{
    path: 'create-event',
    component: CreateEventComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule { }

export const routedComponents = [
  EventsComponent,
  CreateEventComponent
];
