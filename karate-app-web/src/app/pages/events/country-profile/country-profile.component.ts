import { Component, OnInit } from '@angular/core';
import { Country } from '../../../models/country';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../services/country-service/country.service';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';
import { Competitor } from '../../../models/competitor';
import { Team } from '../../../models/team';

@Component({
  selector: 'ngx-country-profile',
  templateUrl: './country-profile.component.html',
  styleUrls: ['./country-profile.component.scss']
})
export class CountryProfileComponent implements OnInit {

  country: Country = new Country();
  countryId: string;
  eventId: string;
  competitors: Competitor[];
  teams: Team[];

  constructor(private route: ActivatedRoute, private countryService: CountryService, private competitorService: CompetitorService) { 
    this.countryId = route.snapshot.paramMap.get('countryId');
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.competitorService.getCompetitorsByCountry(this.countryId).subscribe(data => {
      this.competitors = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Competitor;
      });
    });

    this.competitorService.getTeamsByCountry(this.countryId).subscribe(data => {
      this.teams = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Team;
      });
    });
  }

  ngOnInit() {
    this.countryService.getCountryById(this.countryId).subscribe(data => {
      this.country = {
        id: data.payload.id,
        ...data.payload.data()
      } as Country;
    });
  }

  deleteCompetitors(competitor) {
    this.competitorService.deleteCompetitor(competitor);
  }

}
