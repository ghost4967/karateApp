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
  competitor: Competitor;
  blueGroups: Group[];
  redGroups: Group[];
  katas: any;
  isEnableViewGrades: boolean;
  sesion: string;
  competition: FirebaseCompetition = new FirebaseCompetition();

  constructor(private route: ActivatedRoute, private sortService: SortService, private competitionService: CompetitionService) { 
    this.eventId = route.snapshot.paramMap.get('eventId');
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
      this.blueGroups = this.competition.groups.filter(group => group.side == 'blue' && group.kata == this.competition.numberOfKatas);
      this.redGroups = this.competition.groups.filter(group => group.side == 'red' && group.kata == this.competition.numberOfKatas);
    })
    
  }

  startCompetition(offlineCompetitor, group) {
    this.competitionService.addCompetitorToPanel(group.kataManager, offlineCompetitor, offlineCompetitor.kataName);
    this.competitor = offlineCompetitor;
    this.sesion = group.kataManager;
  }

  createPanel(group) {
    this.competitionService.createPanel(group, group.kataManager, this.competition);
  }
  
  goToGradeView() {
    if(this.sesion !== undefined && this.competitor !== undefined) {
      console.log(this.sesion);
      this.competitionService.getGrade(this.sesion).subscribe(val => {
        console.log(val);
        this.competitionService.createCompetitorGrade(this.competitor, val);
      });

    }
  }
}
