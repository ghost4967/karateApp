import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { KarateService } from '../../services/karate.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-delete-judges',
  templateUrl: 'delete-judges.html',
  providers: [KarateService]
})
export class DeleteJudgesPage {

  judgeGradeList: any;
  sessionName: string;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService, 
    private alertController: AlertController) {
    this.sessionName = navParams.get('sessionName');
  }

  ionViewDidLoad() {
    this.subscription = this.service.getByName(this.sessionName).subscribe(data => {
      this.judgeGradeList = data;
    });
  }

  async deleteJudge(judge) {
    const alert = await this.alertController.create({
      title: 'Eliminar Juez',
      message: 'Estas seguro de eliminar al juez: ' + judge,
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
            this.service.deleteJudgeBySession(this.sessionName, judge);
          }
        }
      ]
    });
    await alert.present();
  }

}
