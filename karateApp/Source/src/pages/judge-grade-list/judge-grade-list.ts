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
  animateClass: any;
  isEnableViewGrades: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    this.sessionName = navParams.get('sessionName');
    this.animateClass = { 'fade-in-left-item': true };
  }

  ionViewDidLoad() {
    this.service.getByName("kata23").subscribe(data => {
      this.judgeGradeList = data;
      this.isEnableViewGrades = this.judgeGradeList.some(function (element) {
          return element.value;
      });
    });
  }

}
