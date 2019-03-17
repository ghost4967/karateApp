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
  judgesList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    this.sessionName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
  }

  ionViewDidLoad() {
    this.service.getByName(this.sessionName).subscribe(data => {
      this.judgesList = data;
    }) 
  }

  goToGrade() {
    
  }

}
