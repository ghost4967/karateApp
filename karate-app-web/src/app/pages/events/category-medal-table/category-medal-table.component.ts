import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-category-medal-table',
  templateUrl: './category-medal-table.component.html',
  styleUrls: ['./category-medal-table.component.scss']
})
export class CategoryMedalTableComponent implements OnInit {

  competitionGrades;
  eventId;
  category;
  competitors = [];
  kataGroups = [];
  competition;
  final = [];
  bronze = [];
  bronze2 = [];
  medalTable = [];

  constructor(private competitionService: CompetitionService,
    private route: ActivatedRoute) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.category = route.snapshot.paramMap.get('categorieName');
  }

  ngOnInit() {
    this.competitionService.getCompetitorsGrades(this.eventId, this.category).subscribe(
      response => {
        this.competitionGrades = response;
        this.competitionService.getCompetition(this.eventId, this.category).subscribe(
          response => {
            this.competition = response[0];
            this.groupGrades();
          }
        );
      }
    );

  }

  groupGrades() {
    from(this.competitionGrades)
      .pipe(
        groupBy((element: any) => {
          var competitor = element.competitor.competitor;
          return this.buildCompetitorName(competitor);
        }, p => p),
        mergeMap(group => zip(of(group.key), group.pipe(toArray())))
      )
      .subscribe(data => { this.competitors.push(data); })
    this.keepOnlyLatestKata();
    this.splitInGroups();
    this.sortFinals();
    this.buildMedalTable();
  }

  keepOnlyLatestKata() {
    var competitorsWithLatestKata = [];
    this.competitors.forEach(element => {
      var data = element[1];
      competitorsWithLatestKata.push([element[0], this.getLatestKata(data)]);
    });
    this.competitors = competitorsWithLatestKata;
  }

  getLatestKata(data) {
    var latestKataNumber = 10000;
    var latestKata = {};
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.kata < latestKataNumber) {
        latestKataNumber = element.kata;
        latestKata = element;
      }
    }
    return latestKata;
  }

  splitInGroups() {
    this.competitors.forEach(element => {
      var kataNumber = element[1].kata;
      if (this.kataGroups[kataNumber] === undefined) {
        this.kataGroups[kataNumber] = [];
      }
      this.kataGroups[kataNumber].push(element);
    });
  }

  sortFinals() {
    var finalists = this.kataGroups[1];
    finalists.forEach(finalist => {
      switch (this.getSide(finalist[0])) {
        case 'final': this.final.push(finalist); break;
        case 'bronze': this.bronze.push(finalist); break;
        case 'bronze2': this.bronze2.push(finalist); break;
      }
    });
  }

  getSide(finalistName) {
    for (let i = 0; i < this.competition.groups.length; i++) {
      const group = this.competition.groups[i];
      if (group.side !== 'blue' && group.side !== 'red') {
        for (let j = 0; j < group.competitors.length; j++) {
          const competitor = group.competitors[j].competitor;
          var competitorName = this.buildCompetitorName(competitor);
          if (competitorName === finalistName) {
            return group.side;
          }
        }
      }
    }
    return 'not found';
  }

  buildCompetitorName(competitor) {
    return competitor.name + ' ' + competitor.lastName + ' ' + (competitor.secondLastName != undefined ? competitor.secondLastName : '');
  }

  buildMedalTable() {
    if (this.final[0][1].grade > this.final[1][1].grade) {
      this.addMedal(this.final[0][0], 1);
      this.addMedal(this.final[1][0], 2);
    } else {
      this.addMedal(this.final[1][0], 1);
      this.addMedal(this.final[0][0], 2);
    }
    if (this.bronze[0][1].grade > this.bronze[1][1].grade) {
      this.addMedal(this.bronze[0][0], 3);
      this.addMedal(this.bronze[1][0], 5);
    } else {
      this.addMedal(this.bronze[1][0], 3);
      this.addMedal(this.bronze[0][0], 5);
    }
    if (this.bronze2[0][1].grade > this.bronze2[1][1].grade) {
      this.addMedal(this.bronze2[0][0], 3);
      this.addMedal(this.bronze2[1][0], 5);
    } else {
      this.addMedal(this.bronze2[1][0], 3);
      this.addMedal(this.bronze2[0][0], 5);
    }
    for (let i = 2; i < this.kataGroups.length; i++) {
      const group = this.kataGroups[i];
      var place = 5 + ((i - 1) * 2);
      group.forEach(element => {
        this.addMedal(element[0], place);
      });
    }
    this.medalTable = this.medalTable.sort((competitor1, competitor2) => {
      return competitor1.place - competitor2.place;
    }
    );
  }

  addMedal(competitor, place) {
    this.medalTable.push(
      {
        competitor: competitor,
        place: place
      }
    );
  }
}
