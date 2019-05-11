import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-spectator-competitors',
  templateUrl: 'spectator-competitors.html',
})
export class SpectatorCompetitorsPage {

  panel;
  category;
  subscription;
  displayCompetitors;
  side;

  competitors = [
    { position: 1, name: 'Juan Carlos Rodrigo Rodriguez', country: 'chile' },
    { position: 2, name: 'Julio Melano Perez Rodriguez', country: 'bolivia' },
    { position: 3, name: 'Mariano de la canasta', country: 'paraguay' },
    { position: 4, name: 'Pedro Dias Ruiz Josefo', country: 'argentina' },
  ];

  constructor(public navCtrl: NavController,
    private service: KarateService,
    public navParams: NavParams) {
    this.panel = navParams.get('sessionName');
    this.category = navParams.get('category');
    this.side = navParams.get('side');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpectatorCompetitorsPage');
    this.subscription = this.service.getPanelName(this.panel).subscribe(data => {
      this.competitors = data.qualified === undefined ? [] : data.qualified;
      this.displayCompetitors = this.competitors.map((element: any, iterator) => {
        return {
          position: iterator + 1,
          name: element.competitor.name + ' ' + element.competitor.lastName,
          country: element.country.name
        }
      });
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
