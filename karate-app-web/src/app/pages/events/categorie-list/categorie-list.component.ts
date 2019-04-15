import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event-service/event.service';

@Component({
  selector: 'ngx-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  event: Event = new Event();
  eventId: string;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
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
