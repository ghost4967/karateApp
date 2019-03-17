import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-waiting-kata',
  templateUrl: 'waiting-kata.html',
  providers:[KarateService]
})
export class WaitingKataPage {

  sessionName: string;

  judgeList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    this.sessionName = navParams.get('sessionName');

  }

  ionViewDidLoad() {
   console.log(this.service.getByName(this.sessionName));
  }

}
