import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-start-kata',
  templateUrl: 'start-kata.html',
  providers: [KarateService]
})
export class StartKataPage {

  sessionName:string;
  judgeName: string;
  judgesList:Array<any>;
  judgesNumber: number;

  isReadyToStart:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    this.sessionName = navParams.get('sessionName');
    this.judgesNumber = parseInt(navParams.get('judgesNumber'));
  }

  ionViewDidLoad() {
    this.service.getByName(this.sessionName).subscribe(data => {
      this.judgesList = data;
      this.isReadyToStart = this.judgesList.length == this.judgesNumber;
    }) 
  }

  goToGrade() {

  }

}
