import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from '../../../../models/group';
import { CompetitionService } from '../../../../services/competition-service/competition-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-modal',
  templateUrl: './draw-modal.component.html',
})
export class DrawModalComponent {

  drawGroup: any;
  competitor: any;
  session: any;
  katas: any;


  constructor(private activeModal: NgbActiveModal, private competitionService: CompetitionService) { 
    this.competitionService.getKatas().subscribe(data => {
        this.katas = data;
      });
  }

  searchId(term: string, item: any) {
    return item.name.toLowerCase().indexOf(term.toLocaleLowerCase()) > -1 || item.id === parseInt(term);
  }

  closeModal() {
    let competitors = this.drawGroup.competitors.sort((c1,c2) => c2['grade']-c1['grade']);
    console.log('sorted list' + competitors);
    let min = competitors.reduce((prev,next) => prev['index'] < next['index'] ? prev['index'] : next['index']);
    console.log(min); 
    console.log(competitors);
    competitors.forEach(competitor => {
        competitor['index'] = min++;
    });
    console.log(competitors);
    this.activeModal.close(competitors);
  }

  startCompetition(offlineCompetitor) {
    this.competitionService.addCompetitorToPanel(this.drawGroup.kataManager, offlineCompetitor, offlineCompetitor.kataName);
    this.competitor = offlineCompetitor;
    this.session = this.drawGroup.kataManager;
    console.log(offlineCompetitor.kataName);
    offlineCompetitor.isGradePresent = false;
    offlineCompetitor.inGradingProcess = true;
    let subscription: Subscription;
    subscription = this.competitionService.getGrade(this.drawGroup.kataManager).subscribe(val => {
      if (val != null) {
        offlineCompetitor.grade = val;     
        offlineCompetitor.inGradingProcess = false;
        offlineCompetitor.isGradePresent = true;
        subscription.unsubscribe();
      }
    });
  }
}