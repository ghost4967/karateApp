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

  judgeName:string;
  isReadyToGrade: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    this.sessionName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
  }

  ionViewDidLoad() {
    this.service.getStatusBySession(this.sessionName).subscribe(data => {
      this.isReadyToGrade = data[0].start;
      console.log(this.isReadyToGrade);
      this.checkData();
     
    });
  }

  checkData() {
    if (this.isReadyToGrade) {
      this.navCtrl.setRoot('KarateGradePage', {
        sessionName: this.sessionName,
        judgeName: this.judgeName
      });
      this.navCtrl.popToRoot();
    }
  }

}
