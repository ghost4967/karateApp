import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'ngx-category-medal-table',
  templateUrl: './category-medal-table.component.html',
  styleUrls: ['./category-medal-table.component.scss']
})
export class CategoryMedalTableComponent implements OnInit {

  competitionGrades;
  eventId = '6OAtwwvhR9luz0bvzfBF';
  // eventId = 'qERtQif88D6EIqNrFYxL';
  category = '';

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.competitionService.getCompetitorsGrades(this.eventId).subscribe(
      response => {
        this.competitionGrades = response;
        this.groupGrades();
      }
    );
  }

  groupGrades() {
    from(this.competitionGrades)
      .pipe(
        groupBy((element: any) => {
          var competitor = element.competitor.competitor;
          return competitor.name + ' ' + competitor.lastName + ' ' + competitor.secondLastName;
        }, p => p),
        mergeMap(group => zip(of(group.key), group.pipe(toArray())))
      )
      .subscribe(console.log)
  }

}
