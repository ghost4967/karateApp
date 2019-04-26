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
      console.log(this.competition);
      if (this.side == 'final') {
        this.groups = this.competition.groups.filter(group => group.kata == 1);
      } else {
        this.groups = this.competition.groups.filter(group => group.side == this.side && group.kata == this.competition.numberOfKatas);
      }
      console.log(this.groups);
      this.groups.forEach(group => {
        group.competitors.forEach(competitor => {
          this.competitionService.getCompetitorGradeById(competitor.competitor.id, this.competition.numberOfKatas).subscribe(data => {
            let grades = data.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Object;
            });
            console.log(grades);
            let grade = grades[grades.length];
            /*competitor['isGradePresent'] = grade == null ? false : true;
            competitor['grade'] = grade == null ? null : grade['grade'];*/
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
  }

  createPanel(group) {
    this.competitionService.createPanel(group, group.kataManager, this.competition);
  }

  goToGradeView(offlineCompetitor, group) {
    if (group.kataManager !== undefined && offlineCompetitor !== undefined) {
      console.log(this.sesion);
      this.competitionService.getGrade(group.kataManager).subscribe(val => {
        offlineCompetitor.grade = val;     
          this.competitionService.createCompetitorGrade(offlineCompetitor, val, this.competition.numberOfKatas);
          offlineCompetitor.isGradePresent = true;
        /*
         else {
          let index = group.competitors.findIndex(competitor => competitor.competitor == offlineCompetitor.competitor);
          group.competitors[index].grade = val;
          let competitors = group.competitors.filter(competitor => competitor['restartGrading']);
          competitors.sort((c1,c2) => c2['grade'] - c1['grade']);
          if (competitors.length === 2) {
            let lessGradeCompetitor = competitors[1];
            let maxGradeCompetitor = competitors[0];
            this.competitionService.getCompetitorGradeById(maxGradeCompetitor.competitor.id, this.competition.numberOfKatas).subscribe(data => {
              let grades = data.map(e => {
                return {
                  id: e.payload.doc.id,
                  ...e.payload.doc.data()
                } as Object;
              });
              console.log(grades);
              let grade = grades[0];
              maxGradeCompetitor['isGradePresent'] = grade == null ? false : true;
              maxGradeCompetitor['grade'] = grade == null ? null : grade['grade'];
            })
            let lessGradeIndex = group.competitors.findIndex(competitor => competitor.competitor == lessGradeCompetitor.competitor);
            group.competitors[lessGradeIndex].grade --;
            competitors.forEach(competitor => competitor.isGradePresent = true);
            console.log(group);  
          }
             
        }*/
        console.log(offlineCompetitor.grade);
      });
      console.log(offlineCompetitor.grade);
    }
  }


  nextKata(group: Group) {
    group.competitors.sort((c1, c2) => c2['grade'] - c1['grade']);
    let qualifiedCompetitors = group.competitors.slice(0, 4);
    let nextKata = this.competition.numberOfKatas - 1;
    let nextGroup = this.competition.groups.find(group => group.kata == nextKata && group.side == this.side);
    let fiveCompetitor = group.competitors[4];
    if (fiveCompetitor['grade'] != qualifiedCompetitors[3]['grade']) {
      qualifiedCompetitors.forEach(competitor => {
        delete competitor['grade'];
      });
      nextGroup.competitors = qualifiedCompetitors;
      let otherSide = this.side == "blue" ? "red" : "blue";
      let nextGroupSide = this.competition.groups.find(group => group.kata == nextKata && group.side == otherSide);
      if (nextGroupSide.competitors.every(competitor => competitor['grade'])) {
        this.competition.numberOfKatas--;
      }
      this.competitionService.updateCompetitionById(this.competition);
    } else {


    }
  }

  restartCompetitorCompetition(offlineCompetitor) {
    offlineCompetitor.isGradePresent = false;
    offlineCompetitor.restartGrading = true;
    offlineCompetitor.grade = null;
  }
  orderGrades(group: Group) {
    group.competitors.sort((c1, c2) => c2['grade'] - c1['grade']);
  }
}
