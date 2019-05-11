import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { Subscription } from 'rxjs/internal/Subscription';

@IonicPage()
@Component({
  selector: 'page-start-kata',
  templateUrl: 'start-kata.html',
  providers: [KarateService]
})
export class StartKataPage {

  sessionName: string;
  judgeName: string;
  judgesList: Array<any>;
  judgesNumber: number;
  subscription: Subscription;

  pages = [
    {
      icon: 'trash',
      title: 'Eliminar jueces',
      component: 'DeleteJudgesPage'
    }
  ]


  isReadyToStart: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService,
    private alertController: AlertController) {
    this.sessionName = navParams.get('sessionName');
    console.log(this.sessionName);
    this.judgesNumber = parseInt(navParams.get('judgesNumber'));
  }

  ionViewDidLoad() {
    this.subscription = this.service.getByName(this.sessionName).subscribe(data => {
      this.judgesList = data;
      this.isReadyToStart = this.judgesList.length == this.judgesNumber;
    });
  }

  ionViewWillEnter() {
    this.subscription = this.service.getByName(this.sessionName).subscribe(data => {
      this.judgesList = data;
      this.isReadyToStart = this.judgesList.length == this.judgesNumber;
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  goToWaitingKataManager() {
    this.service.setView(this.sessionName, 'waitingCompetitor');
    this.navCtrl.setRoot('WaitingCompetitorPage', {
      sessionName: this.sessionName
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
