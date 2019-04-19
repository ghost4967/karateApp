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
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'ngx-competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.scss']
})
export class CompetitorListComponent implements OnInit {

  eventId: string;
  categorieName: string;
  competitors: Competitor[];
  startSort: boolean = false;
  listToSortGroups: Array<Array<OfflineCompetitor>> = new Array();
  offlineCompetitors: Array<OfflineCompetitor> = new Array();
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
      this.listToSortGroups = this.countryService.buildOfflineCompetitorList(this.countries, this.competitors);
      this.fillOfflineCompetitors();
      this.groupArray = this.sortService.shuffleGroups(this.listToSortGroups, this.competition.numberOfKatas, this.groupArray);
      this.blueGroups = this.groupArray.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      this.redGroups = this.groupArray.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
    });
  }

  fillOfflineCompetitors() {
    this.listToSortGroups.forEach(data => {
      data.forEach(offlineCompetitor => {
        this.offlineCompetitors.push(offlineCompetitor);
      })
    })
  }

  shuffleGroups() {
    this.cleanCompetitors();
    this.startSort = true;
    this.groupArray = this.sortService.shuffleGroups(this.listToSortGroups, this.competition.numberOfKatas, this.groupArray);
     this.fillEmptyKataGroups();
    this.blueGroups = this.groupArray.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
    this.redGroups = this.groupArray.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
    this.randomOrder(this.redGroups);
    this.randomOrder(this.blueGroups);

  }

  fillEmptyKataGroups() {
    this.groupArray.forEach(group => {
      if ((this.competition.numberOfKatas - 1) == group.kata) {
        for(let i = 1 ; i <= 8 ; i++) {
          let offlineCompetitor = new OfflineCompetitor();
          offlineCompetitor.competitor = new Competitor();
          offlineCompetitor.competitor.name = '';
          offlineCompetitor.competitor.lastName = '';
          offlineCompetitor.country = new Country();
          offlineCompetitor.country.name='';
          group.competitors.push(offlineCompetitor);
        }
      }
    })
  }

  cleanCompetitors() {
    this.groupArray.forEach(group => {
      group.competitors = new Array();
    })
  }

  exportPdf() {
    var data = document.getElementById('sortTable'); 
    html2canvas(data).then(canvas => { 
    var imgWidth = 208; 
    var pageHeight = 295; 
    var imgHeight = canvas.height * imgWidth / canvas.width; 
    var heightLeft = imgHeight; 
    
    const contentDataURL = canvas.toDataURL('image/png') 
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
    var position = 0; 
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
    pdf.save('MYPdf.pdf');
    }); 
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
    this.firebaseCompetition.numberOfKatas = this.competition.numberOfKatas;
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
