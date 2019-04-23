import { Component, OnInit } from '@angular/core';
import { Team } from '../../../models/team';
import { ActivatedRoute } from '@angular/router';
import { Competitor } from '../../../models/competitor';
import { EventService } from '../../../services/event-service/event.service';
import { Categorie } from '../../../models/categorie';
import { Event } from '../../../models/event';
import { CountryService } from '../../../services/country-service/country.service';
import { Country } from '../../../models/country';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';

@Component({
  selector: 'ngx-team-register',
  templateUrl: './team-register.component.html',
  styleUrls: ['./team-register.component.scss']
})
export class TeamRegisterComponent implements OnInit {

  team: Team = new Team();
  competitor: Competitor = new Competitor(); 
  country: Country = new Country();
  categories: Categorie[];
  eventId: string;
  countryId: string;
  teamNumber: number;
  constructor(private route: ActivatedRoute, private eventService: EventService, private countryService: CountryService, 
    private competitorService: CompetitorService) { 
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.countryId = route.snapshot.paramMap.get('countryId');
  }

  ngOnInit() {
    this.competitorService.getTeamsByCountry(this.countryId).subscribe(data => {
      let teams = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Team;
      });
      this.teamNumber = teams.length + 1;
    });
    this.eventService.getEventById(this.eventId).subscribe(data => {
      let event = {
        id: data.payload.id,
        ...data.payload.data(),
      } as Event;
      this.categories = event.categories;
      console.log(this.categories);
      this.categories = this.categories.filter(categorie => categorie.type == "team");
      console.log(this.categories);
    });
    this.countryService.getCountryById(this.countryId).subscribe(data => {
      this.country = {
        id: data.payload.id,
        ...data.payload.data()
      } as Country;
    });
  }

  addCompetitor() {
    this.team.competitors.push(this.competitor);
    this.competitor = new Competitor();
  }

  saveTeam() {
    this.team.eventId = this.eventId;
    this.team.countryId = this.countryId;
    this.team.name = "Equipo " + this.country.name + " " + this.teamNumber;
    this.competitorService.createTeam(this.team);
  }

}
