import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-grade-sended',
  templateUrl: 'grade-sended.html',
  providers: [KarateService]
})
export class GradeSendedPage {

  sessionName: string;
  judgeName: string;
  restartSession: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService, 
    private alertController: AlertController) {
    this.sessionName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
  }

  ionViewDidLoad() {
    this.karateService.getStatusBySession(this.sessionName).subscribe(data => {
      this.restartSession = data[0].restart;
      if (this.restartSession) {
        this.navCtrl.setRoot('WaitingKataPage',{
          sessionName: this.sessionName,
          judgeName: this.judgeName
        });
        this.navCtrl.popToRoot();
      }
    })
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
