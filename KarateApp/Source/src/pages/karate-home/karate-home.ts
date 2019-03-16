import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-karate-home',
  templateUrl: 'karate-home.html',
})
export class KarateHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  joinSesion() {
    this.navCtrl.push('JoinSesionPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KarateHomePage');
  }

  goToCreate () {
    this.navCtrl.push('CreatePanelPage');
  }

}
