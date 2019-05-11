import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-karate-home',
  templateUrl: 'karate-home.html',
})
export class KarateHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController) {
  }

  joinSesion(spectate) {
    this.navCtrl.push('JoinSesionPage', {isSpectator: spectate});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KarateHomePage');
  }

  goToCreate () {
    this.navCtrl.push('CreatePanelPage');
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
              this.navCtrl.setRoot('KarateLoginPage');
              this.navCtrl.popToRoot();
            }
          }
        ]
      });
      await alert.present();
  
  }

}
