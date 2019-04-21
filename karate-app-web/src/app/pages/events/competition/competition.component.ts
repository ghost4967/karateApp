import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortService } from '../../../services/sort-service/sort.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { Group } from '../../../models/group';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { OfflineCompetitor } from '../../../models/offline-competitor';

@Component({
  selector: 'ngx-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  eventId: string;
  categorieName: string;
  competitions: FirebaseCompetition[];
  blueGroups: Group[];
  redGroups: Group[];
  katas: any;

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
      let competition = this.competitions[0];
      this.blueGroups = competition.groups.filter(group => group.side == 'blue' && group.kata == competition.numberOfKatas);
      this.redGroups = competition.groups.filter(group => group.side == 'red' && group.kata == competition.numberOfKatas);
    })
  }

  startCompetition(offlineCompetitor: OfflineCompetitor) {

  }

}
