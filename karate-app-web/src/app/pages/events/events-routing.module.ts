import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventProfileComponent } from './event-profile/event-profile.component';
import { AddCountriesComponent } from './add-countries/add-countries.component';
import { CompetitorRegisterComponent } from './competitor-register/competitor-register.component';
import { CountryProfileComponent } from './country-profile/country-profile.component';

const routes: Routes = [{
  path: '',
  component: EventsComponent,
  children: [{
    path: 'create-event',
    component: CreateEventComponent,
  }, {
    path: 'event-list',
    component: EventListComponent
  }, {
    path: ':eventId',
    component: EventProfileComponent,
  }, {
    path: ':eventId/add-countries',
    component: AddCountriesComponent
  }, {
    path: ':eventId/add-countries/:countryId',
    component: CountryProfileComponent
  }, {
    path: 'country/add-competitor/:eventId/:countryId',
    component: CompetitorRegisterComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule { }

export const routedComponents = [
  EventsComponent,
  CreateEventComponent,
  EventListComponent,
  EventProfileComponent,
  AddCountriesComponent,
  CompetitorRegisterComponent,
  CountryProfileComponent
];
