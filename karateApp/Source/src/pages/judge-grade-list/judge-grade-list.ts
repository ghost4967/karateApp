import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-judge-grade-list',
  templateUrl: 'judge-grade-list.html',
  providers: [KarateService]
})
export class JudgeGradeListPage {

  sessionName: string;
  judgeGradeList: Array<any>;
  judgeGradeListSended: Array<any> = new Array();
  animateClass: any;
  isEnableViewGrades: boolean = false;
  judgesNumber: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
   this.sessionName = navParams.get('sessionName');
   this.animateClass = { 'fade-in-left-item': true };
   this.service.getNumberOfJudges(this.sessionName).subscribe(data => {
      this.judgesNumber = data;
   })
  }

  ionViewDidLoad() {
    this.service.getByName(this.sessionName).subscribe(data => {
      this.judgeGradeList = data; 
      this.fillSendedList();
      this.isEnableViewGrades = this.judgeGradeListSended.length == parseInt(this.judgesNumber);
      console.log(this.isEnableViewGrades);
    });
  }

  goToGradeView() {
      this.navCtrl.setRoot('DisplayGradePage', {
        sessionName: this.sessionName
      });
      this.navCtrl.popToRoot();
  }

  fillSendedList() {
    this.judgeGradeListSended = [];
    this.judgeGradeList.forEach(element => {
      if (element.value) {
        this.judgeGradeListSended.push(element);
      }
    })
  }

}
