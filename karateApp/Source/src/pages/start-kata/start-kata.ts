import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-start-kata',
  templateUrl: 'start-kata.html',
  providers: [KarateService]
})
export class StartKataPage {

  sessionName:string;
  judgeName: string;
  judgesList:Array<any>;
  judgesNumber: number;

  isReadyToStart:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService, 
      private alertController: AlertController) {
    this.sessionName = navParams.get('sessionName');
    console.log(this.sessionName);
    this.judgesNumber = parseInt(navParams.get('judgesNumber'));
  }

  ionViewDidLoad() {
    this.service.getByName(this.sessionName).subscribe(data => {
      this.judgesList = data;
      this.isReadyToStart = this.judgesList.length == this.judgesNumber;
    }) 
  }

  goToWaitingKataManager() {
    this.navCtrl.setRoot('WaitingKataManagerPage', {
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
