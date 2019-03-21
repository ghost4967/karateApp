import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-waiting-kata-manager',
  templateUrl: 'waiting-kata-manager.html',
  providers: [KarateService]
})
export class WaitingKataManagerPage {

  sessionName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService, 
      private alertController: AlertController) {
    this.sessionName = navParams.get('sessionName')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitingKataManagerPage');
  }

  enableGrade() {
    this.karateService.startGrading(this.sessionName);
    this.navCtrl.setRoot('JudgeGradeListPage', {
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

}
