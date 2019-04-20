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
  isCompetition;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.isCompetition = this.route.snapshot.queryParamMap.get("competition");
    if (this.isCompetition == null) {
      this.isCompetition = false;
    }

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
