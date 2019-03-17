import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GradeSendedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grade-sended',
  templateUrl: 'grade-sended.html',
})
export class GradeSendedPage {

  sessionName: string;
  judgeName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sessionName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradeSendedPage');
  }

}
