import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortService } from '../../../services/sort-service/sort.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { Group } from '../../../models/group';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { OfflineCompetitor } from '../../../models/offline-competitor';
import { Competitor } from '../../../models/competitor';
import { Subscription } from 'rxjs';
import { GroupsFilterPipe } from '../../../pipes/groups/groups-filter.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DrawModalComponent } from './draw-modal/draw-modal.component';
import { Location } from '@angular/common';


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

  drawGroups: Array<Group> = new Array();
  drawCompetitors: Array<any> = new Array();
  startDrawGrading: boolean;
  qualifiedCompetitors: any;

  constructor(private route: ActivatedRoute, private sortService: SortService, private competitionService: CompetitionService,
    private modalService: NgbModal, private location: Location) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.side = route.snapshot.queryParamMap.get('side')
    this.categorieName = route.snapshot.paramMap.get('categorieName');
    this.competitionService.getKatas().subscribe(data => {
      this.katas = data;
    });
  }

  searchId(term: string, item: any) {
    return item.name.toLowerCase().indexOf(term.toLocaleLowerCase()) > -1 || item.id === parseInt(term);
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
        this.groups = this.competition.groups.filter(group => group.side == 'final');
      } else if (this.side == 'bronze') {
        this.groups = this.competition.groups.filter(group => group.side == 'bronze');
      } else if (this.side == 'bronze2') {
        this.groups = this.competition.groups.filter(group => group.side == 'bronze2');
      }
      else {
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

  goBack() {
    this.location.back();
  }

  startCompetition(offlineCompetitor, group) {
    this.competitionService.addCompetitorToPanel(group.kataManager, offlineCompetitor, offlineCompetitor.kataName, this.side);
    this.competitor = offlineCompetitor;
    this.sesion = group.kataManager;
    console.log(offlineCompetitor.kataName);
    offlineCompetitor.isGradePresent = false;
    offlineCompetitor.inGradingProcess = true;
    let subscription: Subscription;
    subscription = this.competitionService.getGrade(group.kataManager).subscribe(val => {
      if (val != null) {
        offlineCompetitor.grade = val;
        offlineCompetitor.inGradingProcess = false;
        offlineCompetitor.isGradePresent = true;
        this.competitionService.createCompetitorGrade(offlineCompetitor, val, group.kata);
        subscription.unsubscribe();
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
      judgeList.forEach(element => {
        this.competitionService.restartJudgeStatus(this.sesion, element.Nombre);
      });
    });
    subscription.unsubscribe();
  }

  createPanel(group) {
    this.competitionService.createPanel(group, group.kataManager, this.competition);
  }



  nextKata(group: Group) {
    this.startDrawGrading = false;
    this.drawCompetitors = [];
    if (group.kata == 2) {
      let searchGroup = this.competition.groups.find(g => g.kata == group.kata && g.side == group.side);
      searchGroup.isGraded = true;
      searchGroup.competitors = this.qualifiedCompetitors;
      this.competitionService.updateCompetitionById(this.competition);
    } else {
      let qualifiedCompetitors = this.qualifiedCompetitors.slice(0, 4);
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

      this.competitionService.saveQualified(this.sesion, qualifiedCompetitors);
      this.competitionService.setView(this.sesion, 'qualified');

      qualifiedCompetitors.reverse();
      nextGroup.competitors = qualifiedCompetitors;
      if (group.isGraded) {
        let searchGroup = this.competition.groups.find(g => g.kata == group.kata && g.side == group.side);
        searchGroup.isGraded = true;
        this.competitionService.updateCompetitionById(this.competition);
      }
    }
    this.qualifiedCompetitors = [];
  }

  restartCompetitorCompetition(offlineCompetitor) {
    offlineCompetitor.isGradePresent = false;
    offlineCompetitor.restartGrading = true;
    offlineCompetitor.grade = null;
  }

  orderGrades(group: Group) {
    group.competitors.sort((c1, c2) => c2['grade'] - c1['grade']);
    let repeatedGrades = this.foundRepeatedGrades(group.competitors);
    this.buildDrawGroups(group, repeatedGrades);
    console.log(this.drawGroups);
    console.log(group);
    group.competitors.forEach(competitor => {
      this.drawGroups.forEach(drawGroup => {
        if (drawGroup.competitors.find(c => c['grade'] == competitor['grade'])) {
          competitor['qualified'] = true;
          competitor['hasRepeatedGrade'] = true;
          if (drawGroup.competitors.lastIndexOf(competitor) == drawGroup.competitors.length - 1) {
            competitor['isEnableToStartReplay'] = true;
          }
        } else if (group.competitors.slice(0, group.kata == 2 ? 3 : 4).find(c => c['grade'] == competitor['grade'])) {
          competitor['qualified'] = true;
        }
      })
    });
    this.qualifiedCompetitors = group.competitors;
  }

  checkGrades(group) {
    return group.competitors.every(competitor => competitor['grade'] != null);
  }

  startReplay(offlineCompetitor, group) {
    let drawGroup = this.drawGroups.find(group =>
      group.competitors.some(competitor => competitor['grade'] == offlineCompetitor['grade']));
    this.cleanGrades(drawGroup);
    drawGroup.competitors.forEach(competitor => {
      competitor['index'] = group.competitors.findIndex(c => c.competitor == competitor.competitor);
    });
    console.log(drawGroup.competitors);
    const activeModal = this.modalService.open(DrawModalComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });
    activeModal.componentInstance.drawGroup = drawGroup;
    activeModal.result.then(competitors => {
      console.log(group.competitors);
      competitors.forEach(competitor => {
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
        competitor['hasRepeatedGrade'] = false;
        this.changePosition(group.competitors, group.competitors.findIndex(c => c.competitor == competitor.competitor), competitor['index']);
      });
      this.qualifiedCompetitors = group.competitors;
      console.log(this.qualifiedCompetitors);
    });
  }

  private cleanGrades(group) {
    group.competitors.forEach(competitor => {
      competitor['grade'] = null;
      competitor['isGradePresent'] = false;
    })
  }

  private buildDrawGroups(group, repeatedGrades) {
    const copyGroup = { ...group }
    repeatedGrades.forEach(grade => {
      let competitors = copyGroup.competitors.filter(competitor => competitor['grade'] == grade);
      let groupToSave = copyGroup;
      groupToSave.competitors = competitors;
      groupToSave.finishDrawDefinition = false;
      this.drawGroups.push(groupToSave);
    })
  }

  private foundRepeatedGrades(competitors) {
    const object = {};
    const result = [];

    competitors.forEach(item => {
      if (!object[item['grade']])
        object[item['grade']] = 0;
      object[item['grade']] += 1;
    })

    for (const prop in object) {
      if (object[prop] >= 2) {
        result.push(prop);
      }
    }
    return result;
  }

  private changePosition(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };
}
