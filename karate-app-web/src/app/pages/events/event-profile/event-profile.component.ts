import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { EventService } from '../../../services/event-service/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-event-profile',
  templateUrl: './event-profile.component.html',
  styleUrls: ['./event-profile.component.scss']
})
export class EventProfileComponent implements OnInit {

  event: Event = new Event();
  eventId: string;

  constructor( private activateRoute: ActivatedRoute, private eventService: EventService, private router: Router) {
    this.eventId = activateRoute.snapshot.paramMap.get('eventId');
   
   }

  ngOnInit() {
    this.eventService.getEventById(this.eventId).subscribe(data => {
      this.event = {
        id: data.payload.id,
        ...data.payload.data()
      } as Event;
    });
  }

  gotEventList () {
    this.router.navigate(['/pages/events/event-list']);
  }

  goMedal () {
    this.router.navigate([`/pages/events/${this.eventId}/medal-table`]);
  }

  goContries() {
    //routerLink="/pages/events/{{event.id}}/add-countries"
    this.router.navigate([`/pages/events/${this.eventId}/add-countries`])
  }
}
