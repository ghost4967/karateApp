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
  offlineCompetitorList: Array<Array<OfflineCompetitor>> = new Array();
  competition: Competition = new Competition();
  firebaseCompetition: FirebaseCompetition = new FirebaseCompetition();
  groupArray: Array<Group>;
  blueGroups: Array<Group>;
  redGroups: Array<Group>;
  countries: Array<Country> = new Array();

  constructor(private route: ActivatedRoute, private competitorService: CompetitorService, private countryService: CountryService,
    private sortService: SortService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.categorieName = route.snapshot.paramMap.get('categorieName');
    this.groupArray = new Array();
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
      this.offlineCompetitorList = this.countryService.buildOfflineCompetitorList(this.countries, this.competitors);
      this.groupArray = this.sortService.shuffleGroups(this.offlineCompetitorList, this.competition.numberOfKatas, this.groupArray);
      this.blueGroups = this.groupArray.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      this.redGroups = this.groupArray.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      console.log(this.groupArray)
    });
  }

  shuffleGroups() {
    this.cleanCompetitors();
    this.groupArray = this.sortService.shuffleGroups(this.offlineCompetitorList, this.competition.numberOfKatas, this.groupArray);
    this.blueGroups = this.groupArray.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
    this.redGroups = this.groupArray.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
    this.randomOrder(this.redGroups);
    this.randomOrder(this.blueGroups);

  }

  cleanCompetitors() {
    this.groupArray.forEach(group => {
      group.competitors = new Array();
    })
  }

  randomOrder(group: Array<Group>) {
    group.forEach(group => {
      group.competitors.sort(function () { 
        return 0.5 - Math.random()
      })
    });
  }

  saveOrderGroups() {
    this.firebaseCompetition.categorie = this.categorieName;
    this.firebaseCompetition.eventId = this.eventId;
    this.groupArray.forEach(group => {
      const competitors = group.competitors.map((obj) => { return Object.assign({}, obj) });
      group.competitors = competitors;
    })
    const groups = this.groupArray.map((obj) => { return Object.assign({}, obj) });
    this.firebaseCompetition.groups = groups;
    this.sortService.createCompetition(this.firebaseCompetition);
  }

  fillBlueSide(side) {
    let kataNumbers = this.competition.numberOfKatas;
    while (side > 0) {
      let group = this.createGroup(kataNumbers, 'blue');
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
      let group = this.createGroup(kataNumbers, 'red');
      this.groupArray.push(group);
      side--;
      kataNumbers--;
    }
  }

}
