import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortService } from '../../../services/sort-service/sort.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { Group } from '../../../models/group';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { OfflineCompetitor } from '../../../models/offline-competitor';
import { Competitor } from '../../../models/competitor';
import { Subscription } from 'rxjs';


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
  readyToFinal: boolean = false;
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
        this.groups = this.competition.groups.filter(group => group.kata == 1);
      } else {
        this.groups = this.competition.groups.filter(group => group.side == this.side && !group.isGraded && group.competitors.every(competitor => competitor.competitor.name != ''));
      }
      this.readyToFinal = this.groups.length == 0;
      this.groups.forEach(group => {
        group.competitors.forEach(competitor => {
          this.competitionService.getCompetitorGradeById(competitor.competitor.id, group.kata).subscribe(data => {
            let grades = data.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Object;
            });
            let grade = grades[grades.length - 1];
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
    offlineCompetitor.inGradingProcess = true;
    this.competitionService.getGrade(group.kataManager).subscribe(val => {
      if (val != null) {
        offlineCompetitor.inGradingProcess = false;
      }
    });
  }

  cancelGradeProcess(offlineCompetitor) {
    offlineCompetitor.inGradingProcess = false;
    offlineCompetitor.isGradePresent = false;
    this.competitionService.restartSession(this.sesion);
    let subscription: Subscription;
    subscription = this.competitionService.getJudgesBySessionName(this.sesion).subscribe(data => {
      let judgeList = data;
      console.log(judgeList);
      judgeList.forEach(element => {
        this.competitionService.restartJudgeStatus(this.sesion, element.Nombre);
      });
    });
    subscription.unsubscribe();
  }

  createPanel(group) {
    this.competitionService.createPanel(group, group.kataManager, this.competition);
  }

  goToGradeView(offlineCompetitor, group) {
    if (group.kataManager !== undefined && offlineCompetitor !== undefined) {
      this.competitionService.getGrade(group.kataManager).subscribe(val => {
        offlineCompetitor.grade = val;
        this.competitionService.createCompetitorGrade(offlineCompetitor, val, group.kata);
        offlineCompetitor.isGradePresent = true;
        offlineCompetitor.inGradingProcess = false;
      });
    }
  }


  nextKata(group: Group) {
    group.competitors.sort((c1, c2) => c2['grade'] - c1['grade']);
    let qualifiedCompetitors = group.competitors.slice(0, 4);
    let nextKata = group.kata - 1;
    let nextGroup = this.competition.groups.find(group => group.kata == nextKata && group.side == this.side);
    if (group.competitors.every(competitor => competitor['grade'])) {
      group.isGraded = true;
    }
    qualifiedCompetitors.forEach(competitor => {
      delete competitor['grade'];
      delete competitor['qualified'];
      delete competitor['isGradePresent']
    });
    nextGroup.competitors = qualifiedCompetitors;
    if (group.isGraded) {
      let searchGroup = this.competition.groups.find(g => g.kata == group.kata && g.side == group.side);
      searchGroup.isGraded = true;
      this.competitionService.updateCompetitionById(this.competition);
    }
  }

  restartCompetitorCompetition(offlineCompetitor) {
    offlineCompetitor.isGradePresent = false;
    offlineCompetitor.restartGrading = true;
    offlineCompetitor.grade = null;
  }
  orderGrades(group: Group) {
    group.competitors.sort((c1, c2) => c2['grade'] - c1['grade']);
    if (group.kata == 2) {
      group.competitors.slice(0, 3).forEach(competitor => {
        competitor['qualified'] = true;
      });
      let searchGroup = this.competition.groups.find(g => g.kata == group.kata && g.side == group.side);
      searchGroup.isGraded = true;
      this.competitionService.updateCompetitionById(this.competition);
    } else {
      group.competitors.slice(0, 4).forEach(competitor => {
        competitor['qualified'] = true;
      });
    }


  }
}
