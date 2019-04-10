import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { EventService } from '../../../services/event-service/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-event-profile',
  templateUrl: './event-profile.component.html',
  styleUrls: ['./event-profile.component.scss']
})
export class EventProfileComponent implements OnInit {

  event: Event;
  eventId: string;

  constructor( private route: ActivatedRoute, private eventService: EventService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
   
   }

  ngOnInit() {
    this.eventService.getEventById(this.eventId).subscribe(data => {
      this.event = {
        id: data.payload.id,
        ...data.payload.data()
      } as Event;
    });
  }

}
