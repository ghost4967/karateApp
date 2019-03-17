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
  judgeName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    this.sessionName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');

  }

  ionViewDidLoad() {
    this.service.getByName(this.sessionName).subscribe(data => {
        this.judgeList = data;
    });

    this.service.getStatusBySession(this.sessionName).subscribe(data => {
      if (data) {
        this.navCtrl.push('KarateGradePage', {
          sessionName: this.sessionName,
          judgeName: this.judgeName
        })
      }
    })

  }

}
