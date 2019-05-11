import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-spectator-competitors',
  templateUrl: 'spectator-competitors.html',
})
export class SpectatorCompetitorsPage {

  competitors = [
    {position: 1, name: 'Juan Carlos Rodrigo Rodriguez', country: 'chile'},
    {position: 2, name: 'Julio Melano Perez Rodriguez', country: 'bolivia'},
    {position: 3, name: 'Mariano de la canasta', country: 'paraguay'},
    {position: 4, name: 'Pedro Dias Ruiz Josefo', country: 'argentina'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpectatorCompetitorsPage');
  }

}
