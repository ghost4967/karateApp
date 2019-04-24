import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from '../../../models/categorie';
import { EventService } from '../../../services/event-service/event.service';
import { Competitor } from '../../../models/competitor';
import { Event } from '../../../models/event';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';

@Component({
  selector: 'ngx-competitor-register',
  templateUrl: './competitor-register.component.html',
  styleUrls: ['./competitor-register.component.scss']
})
export class CompetitorRegisterComponent implements OnInit {

  eventId: string;
  countryId: string;
  categories: Categorie[];
  competitor: Competitor = new Competitor();

  constructor(private route: ActivatedRoute, private eventService: EventService, private competitorService: CompetitorService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.countryId = route.snapshot.paramMap.get('countryId');
   }

  ngOnInit() {
    this.eventService.getEventById(this.eventId).subscribe(data => {
      let event = {
        id: data.payload.id,
        ...data.payload.data()
      } as Event;
      this.categories = event.categories;
      //this.categories.filter(categorie => categorie.gender == "single");
    });
  }

  onChange(gender) {
    this.categories.filter(categorie => categorie.gender == gender);
  }

  registerCompetitor() {
    this.competitor.eventId = this.eventId;
    this.competitor.countryId = this.countryId;
    this.competitorService.createCompetitor(this.competitor);
  }

}
