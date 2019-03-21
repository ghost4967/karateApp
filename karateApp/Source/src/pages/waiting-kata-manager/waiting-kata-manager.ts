import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

/**
 * Generated class for the WaitingKataManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-waiting-kata-manager',
  templateUrl: 'waiting-kata-manager.html',
  providers: [KarateService]
})
export class WaitingKataManagerPage {

  sessionName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
    this.sessionName = navParams.get('sessionName')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitingKataManagerPage');
  }

  enableGrade() {
    this.karateService.startGrading(this.sessionName);
    this.navCtrl.setRoot('JudgeGradeListPage', {
      sessionName: this.sessionName
    });
    this.navCtrl.popToRoot();
  }

}
