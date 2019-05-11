import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { CountryServiceProvider } from '../../services/country-service';

@IonicPage()
@Component({
  selector: 'page-spectator-view',
  templateUrl: 'spectator-view.html',
})
export class SpectatorViewPage {

  hasCompetitor = false;
  panel;
  subscription;
  subscription2;
  competitorName;
  kataName;
  country;
  countryCode;
  view = 'waitingJudges';
  category = '';
  side;

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
      if (this.hasCompetitor) {
        this.loadCompetitorData();
      }
      if (this.view === 'displayGrade') {
        this.displayGrade();
      }
      if (this.view === 'qualified') {
        this.showQualifieds();
      }
    })
  }

  ionViewWillLeave() {
    if (!!this.subscription) this.subscription.unsubscribe();
    if (!!this.subscription2) this.subscription2.unsubscribe();
  }

  loadCompetitorData() {
    this.subscription2 = this.service.getPanelName(this.panel).subscribe(data => {
      this.competitorName = data.competitor.competitor.name + " " + data.competitor.competitor.lastName;
      this.kataName = data.kataName;
      this.country = data.competitor.country.name;
      this.getcountryCode();
      this.category = data.competitor.competitor.categorie.name;
      this.side = data.side === 'red' ? 'GRUPO 2' : 'GRUPO 1'
      console.log(this.competitorName);
      console.log(this.kataName);
    });
  }

  getcountryCode() {
    this.countryCode = this.countryService !== undefined ? this.countryService.getAlpha2Code(this.country) : '';
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

  showQualifieds() {
    this.navCtrl.setRoot('SpectatorCompetitorsPage', {
      panel: this.panel,
      category: this.category,
      side: this.side
    });
    this.navCtrl.popToRoot();
  }
}
