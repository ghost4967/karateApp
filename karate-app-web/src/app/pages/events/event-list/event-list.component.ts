import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event-service/event.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'ngx-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event;
      });
      console.log(this.events);
    })
  }

}
