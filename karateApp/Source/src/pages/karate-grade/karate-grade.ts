import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-karate-grade',
  templateUrl: 'karate-grade.html',
  providers: [KarateService]
})
export class KarateGradePage {

  sessioName: string;
  judgeName: string;
  gradeList: Array<any>;

  data = {
    tecnicLevel: '',
    phisicLevel: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService, 
            private alertController: AlertController) {
    this.sessioName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
    this.gradeList = this.karateService.getGradeList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KarateGradePage');
  }

  sendGrade() {
    this.karateService.createGrade(this.data,this.sessioName, this.judgeName);
    this.navCtrl.push('GradeSendedPage', {
      sessionName: this.sessioName,
      judgeName: this.judgeName
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      title: 'Verifica',
      message: 'Estas seguro de esta calificación? Nivel técnico: ' + this.data.tecnicLevel + ', Nivel físico: ' + this.data.phisicLevel,
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
            this.sendGrade();
          }
        }
      ]
    });

    await alert.present();
  }

}
