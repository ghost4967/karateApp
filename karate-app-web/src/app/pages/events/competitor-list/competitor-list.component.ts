import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';
import { Competitor } from '../../../models/competitor';
import { OfflineCompetitor } from '../../../models/offline-competitor';
import { CountryService } from '../../../services/country-service/country.service';
import { Country } from '../../../models/country';
import { Competition } from '../../../models/competition';
import { SortService } from '../../../services/sort-service/sort.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { Group } from '../../../models/group';
import { group } from '@angular/animations/src/animation_metadata';
import { Final } from '../../../models/final';

@Component({
  selector: 'ngx-competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.scss']
})
export class CompetitorListComponent implements OnInit {

  eventId: string;
  categorieName: string;
  competitors: Competitor[];
  competitorList: Array<Array<OfflineCompetitor>> = new Array();
  competition: Competition = new Competition();
  firebaseCompetition: FirebaseCompetition = new FirebaseCompetition();
  groupArray: Array<Group> = new Array();
  countries: Array<Country> = new Array();

  constructor(private route: ActivatedRoute, private competitorService: CompetitorService, private countryService: CountryService,
    private sortService: SortService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.categorieName = route.snapshot.paramMap.get('categorieName');
    console.log(this.categorieName);
  }

  ngOnInit() {
    this.competitorService.getCompetitorsByCategorie(this.eventId, this.categorieName).subscribe(data => {
      this.competitors = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Competitor;
      });
      this.competition = this.sortService.buildCompetition(this.competitors.length);
      let totalGroups = this.sortService.getTotalGroups(this.competition.numberOfKatas);
      let dividedSides = totalGroups / 2;
      this.fillBlueSide(dividedSides);
      this.fillRedSide(dividedSides);
      console.log(this.groupArray);
    });

    this.countryService.getCountriesByEvent(this.eventId).subscribe(data => {
      this.countries = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Country;
      });
      this.countries.forEach(country => {
        let competitors = this.competitors.filter(competitor => competitor.countryId == country.id);
        let competitorOfflineArray = new Array<OfflineCompetitor>();
        competitors.forEach(competitor => {
          let offlineCompetitor = new OfflineCompetitor();
          offlineCompetitor.competitor = competitor;
          offlineCompetitor.country = country;
          competitorOfflineArray.push(offlineCompetitor);
        });
        this.competitorList.push(competitorOfflineArray);
      });
      console.log(this.competitorList);
      this.competitorList.forEach(offlineCompetitors => {
        let randomIndex = Math.floor(Math.random() * offlineCompetitors.length);
        let data = offlineCompetitors[randomIndex];
        offlineCompetitors.forEach(competitor => {
          if (data == competitor && this.groupArray.some(group => !group.competitors.find(competitor => competitor == competitor))) {
            let blueGroup = this.groupArray.find(group => group.kata == this.competition.numberOfKatas && group.side == "blue");
            blueGroup.competitors.push(data);
          } else {
            let redGroup = this.groupArray.find(group => group.kata == this.competition.numberOfKatas && group.side == "red");
            redGroup.competitors.push(competitor);
          }
        });
      });
      this.firebaseCompetition.categorie = this.categorieName;
      this.firebaseCompetition.eventId = this.eventId;
      this.groupArray.forEach(group => {
        const competitors = group.competitors.map((obj)=> {return Object.assign({}, obj)});
        group.competitors = competitors;
      })
      const groups = this.groupArray.map((obj)=> {return Object.assign({}, obj)});
      this.firebaseCompetition.groups = groups;
      this.sortService.createCompetition(this.firebaseCompetition);
    });
  }

  fillBlueSide(side) {
    let kataNumbers = this.competition.numberOfKatas;
    while (side > 0) {
      let group = this.createGroup(kataNumbers, "blue");
      this.groupArray.push(group);
      side--;
      kataNumbers--;
    }
  }

  private createGroup(kataNumbers: number, side: string) {
    let group = new Group();
    group.kata = kataNumbers;
    group.side = side;
    return group;
  }

  fillRedSide(side) {
    let kataNumbers = this.competition.numberOfKatas;
    while (side > 0) {
      let group = this.createGroup(kataNumbers, "red");
      this.groupArray.push(group);
      side--;
      kataNumbers--;
    }
  }

}
