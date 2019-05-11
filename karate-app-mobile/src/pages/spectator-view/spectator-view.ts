import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { CountryServiceProvider } from '../../services/country-service';
/**
 * Generated class for the SpectatorViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spectator-view',
  templateUrl: 'spectator-view.html',
})
export class SpectatorViewPage {

  hasCompetitor = false;
  panel;
  subscription;
  competitorName;
  kataName;
  country;
  countryCode;
  view = 'waitingJudges';
  category = "kata individual masculino 12-13 años | ronda 2 | groupo 2 ";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: KarateService,
    private countryService: CountryServiceProvider) {
    this.panel = navParams.get('sessionName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpectatorViewPage');
    this.subscription = this.service.getStatusBySession(this.panel).subscribe(data => {
      this.hasCompetitor = data[0].nextCompetitor;
      this.view = data[0].view;
      if(this.hasCompetitor){
        this.loadCompetitorData();
      }
      if(this.view === 'displayGrade'){
        this.displayGrade();
      }
    })
  }

  loadCompetitorData() {
    this.subscription = this.service.getPanelName(this.panel).subscribe(data => {
      this.competitorName = data.competitor.competitor.name + " " + data.competitor.competitor.lastName;
      this.kataName = data.competitor.kataName;
      this.country = data.competitor.country.name;
      this.countryCode = this.countryService.getAlpha2Code(this.country);
      console.log(this.competitorName);
      console.log(this.kataName);
    });
  }

  displayGrade() {
    this.navCtrl.setRoot('SpectatorResultsPage', {
      panel: this.panel,
      kata: this.kataName,
      category: this.category,
      competitorName: this.competitorName,
      country: this.country,
      countryCode: this.countryCode
    });
    this.navCtrl.popToRoot();
  }
}
