import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-waiting-kata-manager',
  templateUrl: 'waiting-kata-manager.html',
  providers: [KarateService]
})
export class WaitingKataManagerPage {

  sessionName: string;
  competitorName: string;
  kataName: string;
  restartSession: boolean;
  pages = [
    {
      icon: 'trash',
      title: 'Eliminar jueces',
      component: 'DeleteJudgesPage'
    }
  ]

  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService,
    private alertController: AlertController) {
    this.sessionName = navParams.get('sessionName')
  }

  ionViewDidLoad() {
    this.subscription = this.karateService.getPanelName(this.sessionName).subscribe(data => {
      this.competitorName = data.competitor.competitor.name + " "+ data.competitor.competitor.lastName;
      this.kataName = data.competitor.kataName;
      console.log(this.competitorName);
      console.log(this.kataName);
    });

    this.subscription = this.karateService.getStatusBySession(this.sessionName).subscribe(data => {
      this.restartSession = data[0].restart;
      if (this.restartSession) {
        this.navCtrl.setRoot('WaitingCompetitorPage',{
          sessionName: this.sessionName
        });
        this.navCtrl.popToRoot();
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  enableGrade() {
    this.karateService.startGrading(this.sessionName);
    this.navCtrl.setRoot('JudgeGradeListPage', {
      sessionName: this.sessionName,
      competitorName: this.competitorName
    });
    this.navCtrl.popToRoot();
  }

  async alertExit() {
    const alert = await this.alertController.create({
      title: 'Salir',
      message: 'Estas seguro de esta salir',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.navCtrl.setRoot('KarateHomePage');
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    await alert.present();

  }

  openPage(page) {
    this.navCtrl.push(page.component, {
      sessionName: this.sessionName
    });
  }

}
