import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortService } from '../../../services/sort-service/sort.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { Group } from '../../../models/group';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { OfflineCompetitor } from '../../../models/offline-competitor';
import { Competitor } from '../../../models/competitor';


@Component({
  selector: 'ngx-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  eventId: string;
  categorieName: string;
  competitions: FirebaseCompetition[];
  competitor: any;
  groups: Group[];
  katas: any;
  isEnableViewGrades: boolean;
  isGradePresent: boolean;
  side: string;
  sesion: string;
  competition: FirebaseCompetition = new FirebaseCompetition();

  constructor(private route: ActivatedRoute, private sortService: SortService, private competitionService: CompetitionService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.side = route.snapshot.queryParamMap.get('side')
    this.categorieName = route.snapshot.paramMap.get('categorieName');
    this.competitionService.getKatas().subscribe(data => {
      this.katas = data;
    })
  }

  ngOnInit() {
    this.sortService.getCompetitionByCategorieAndEvent(this.categorieName, this.eventId).subscribe(data => {
      this.competitions = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as FirebaseCompetition;
      });
      this.competition = this.competitions[0];
      if (this.side == 'final') {
        this.groups = this.competition.groups.filter(group => group.side == this.side && group.kata == this.competition.numberOfKatas);

      } else {
        this.groups = this.competition.groups.filter(group => (group.side ==  ('final' || 'bronze' || 'bronze2'))&& group.kata == this.competition.numberOfKatas);

      }
      this.groups.forEach(group => {
        group.competitors.forEach(competitor => {
          this.competitionService.getCompetitorGradeById(competitor.competitor.id).subscribe(data => {
            let grades = data.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Object;
            });
            let grade = grades[0];
            competitor['isGradePresent'] = grade == null ? false : true;
            competitor['grade'] = grade == null ? null : grade['grade'];
          })
        })
      })
    });

  }

  startCompetition(offlineCompetitor, group) {
    this.competitionService.addCompetitorToPanel(group.kataManager, offlineCompetitor, offlineCompetitor.kataName);
    this.competitor = offlineCompetitor;
    this.sesion = group.kataManager;
    offlineCompetitor.isGradePresent = false;
    this.competitionService.getGrade(group.kataManager).subscribe(data => {
      offlineCompetitor.grade = data;
      if (offlineCompetitor.grade !== null) {
        offlineCompetitor.isGradePresent = true;
        this.competitionService.createCompetitorGrade(offlineCompetitor, data);
      }
    })

  }

  createPanel(group) {
    this.competitionService.createPanel(group, group.kataManager, this.competition);
  }

  goToGradeView(offlineCompetitor, group) {
    if (group.kataManager !== undefined && offlineCompetitor !== undefined) {
      console.log(this.sesion);
      this.competitionService.getGrade(group.kataManager).subscribe(val => {
        offlineCompetitor.grade = val;
        if (offlineCompetitor.grade !== null) {
          this.competitionService.createCompetitorGrade(offlineCompetitor, val);
          offlineCompetitor.isGradePresent = true;
        }
      });

    }
  }

  getGradeByCompetitor(competitorId, offlineCompetitor) {
    let grade;
    this.competitionService.getGrade(this.sesion).subscribe(data => {
      this.competitionService.getCompetitorGradeById(competitorId).subscribe(data => {
        let grades = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          };
        });
        grade = grades[0];
      })
    });
    offlineCompetitor.grade = grade;
  }

  nextKata(group: Group) {
    group.competitors.sort((c1, c2) => c2['grade'] - c1['grade']);
    let qualifiedCompetitors = group.competitors.slice(0, 4);
    let nextKata = this.competition.numberOfKatas - 1;
    let nextGroup = this.competition.groups.filter(group => group.kata == nextKata && group.side == this.side)
    nextGroup[0].competitors = [];
    nextGroup[0].competitors = qualifiedCompetitors;
    this.competitionService.updateCompetitionById(this.competition);
    this.sortService.getCompetitionByCategorieAndEvent(this.categorieName, this.eventId).subscribe(data => {
      this.competitions = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as FirebaseCompetition;
      });
      this.competition = this.competitions[0];
      this.competitionService.updateKataNumber(this.competition)
    });
  }
}
