import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { CountryServiceProvider } from '../../services/country-service';

@IonicPage()
@Component({
  selector: 'page-spectator-results',
  templateUrl: 'spectator-results.html',
})
export class SpectatorResultsPage {

  grades = [];
  phisicalGrades = [];
  displayGrades;
  phisicalDisplayGrades;
  finalGrade;
  panel;
  competitorName;
  subscription;
  subscription2;
  competitor;
  kataName;
  category;
  country;
  countryCode;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: KarateService) {
    this.panel = navParams.get('panel');
    this.kataName = navParams.get('kata');
    this.category = navParams.get('category');
    this.competitorName = navParams.get('competitorName');
    this.country = navParams.get('country');
    this.countryCode = navParams.get('countryCode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpectatorResultsPage');
    this.subscription = this.service.getGrades(this.panel).subscribe(data => {
      var gradeList = data;
      gradeList.forEach(element => {
        this.grades.push(element.Tecnico);
        this.phisicalGrades.push(element.Fisico);
      });
      this.loadGrades();
    });
    this.subscription2 = this.service.getStatusBySession(this.panel).subscribe(data => {
      if (data[0].view === 'waitingCompetitor') {
        this.navCtrl.setRoot('SpectatorViewPage', {
          sessionName: this.panel
        });
      }
    })
  }
  
  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  loadGrades() {
    this.displayGrades = this.getDisplayValues(this.grades, 70);
    this.phisicalDisplayGrades = this.getDisplayValues(this.phisicalGrades, 30);
    this.finalGrade = parseFloat(this.displayGrades[this.displayGrades.length - 1].value)
      + parseFloat(this.phisicalDisplayGrades[this.phisicalDisplayGrades.length - 1].value);
    this.finalGrade = this.finalGrade.toFixed(2);
  }

  getDisplayValues(array: any[], multiplicative) {
    var criticalValues = this.getCriticalValues(array);
    var values = array.map((value) => {
      return { value: parseFloat(value).toFixed(1), color: this.getDisplayColor(value, criticalValues) }
    })
    var sum = values.reduce((acumulative, value) => {
      var increment = value.color === 'white' ? parseFloat(value.value) : 0;
      return acumulative + increment;
    }, 0);
    values.push({
      value: ((sum * multiplicative) / 100).toFixed(2),
      color: 'yellow'
    })
    return values;
  }

  getCriticalValues(array: any[]) {
    var sortedArray = array.slice();
    sortedArray = sortedArray.sort((a, b) => a - b);
    var result = [];
    result.push(sortedArray[0]);
    result.push(sortedArray[sortedArray.length - 1]);
    if (sortedArray.length > 5) {
      result.push(sortedArray[sortedArray.length - 2]);
      result.push(sortedArray[1]);
    }
    return result;
  }

  getDisplayColor(evaluatedValue, criticalValues: any[]) {
    var isRed = criticalValues.some((value, index) => {
      var isCritical = value === evaluatedValue;
      if (isCritical) {
        criticalValues.splice(index, 1);
      }
      return isCritical;
    });
    return isRed ? 'red' : 'white';
  }

}

