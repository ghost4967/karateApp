import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-grade-sended',
  templateUrl: 'grade-sended.html',
  providers: [KarateService]
})
export class GradeSendedPage {

  sessionName: string;
  judgeName: string;
  restartSession: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
    this.sessionName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
  }

  ionViewDidLoad() {
    this.karateService.getStatusBySession(this.sessionName).subscribe(data => {
      this.restartSession = data[0].restart;
      if (this.restartSession) {
        this.navCtrl.push('WaitingKataPage',{
          sessionName: this.sessionName,
          judgeName: this.judgeName
        });
      }
    })
  }

}
