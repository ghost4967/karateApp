import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-join-sesion',
  templateUrl: 'join-sesion.html',
  providers: [KarateService]
})
export class JoinSesionPage {

  data = {
    judgeName: '',
    sessionName: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinSesionPage');
  }

  joinToSession() {
    this.karateService.joinToPanel(this.data);
    this.navCtrl.push('WaitingKataPage',{
      sessionName: this.data.sessionName,
    });
  }

}
