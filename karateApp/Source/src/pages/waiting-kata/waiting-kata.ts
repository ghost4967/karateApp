import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-waiting-kata',
  templateUrl: 'waiting-kata.html',
  providers:[KarateService]
})
export class WaitingKataPage {

  sessionName: string;

  judgeName:string;
  isReadyToGrade: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService, 
    private alertController: AlertController) {
    this.sessionName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
  }

  ionViewDidLoad() {
    this.service.getStatusBySession(this.sessionName).subscribe(data => {
      this.isReadyToGrade = data[0].start;
      console.log(this.isReadyToGrade);
      this.checkData();
     
    });
  }

  checkData() {
    if (this.isReadyToGrade) {
      this.navCtrl.setRoot('KarateGradePage', {
        sessionName: this.sessionName,
        judgeName: this.judgeName
      });
      this.navCtrl.popToRoot();
    }
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
