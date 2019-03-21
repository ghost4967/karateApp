import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';



@IonicPage()
@Component({
  selector: 'page-create-panel',
  templateUrl: 'create-panel.html',
  providers: [KarateService]
})
export class CreatePanelPage {

  params: any = [];
  data = {
    name: '',
    type: ''
  }
  error:string;
  errorType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService, 
      private alertController: AlertController) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePanelPage');
  }

  createPanel() {
    this.karateService.createPanel(this.data);
    this.navCtrl.push('StartKataPage', {
      sessionName: this.data.name,
      judgesNumber: this.data.type
    });

    
   /** if (this.data.type.length > 0) {
      this.karateService.getPanelName(this.data.name).subscribe(dataSesion => {
        console.log(dataSesion);
        if (!dataSesion) {
          this.karateService.createPanel(this.data);
          this.navCtrl.setRoot('StartKataPage', {
            sessionName: this.data.name,
            judgesNumber: this.data.type
          });
          this.navCtrl.popToRoot();
        } else {
          this.error = "El panel ya existe por favor ingrese otro nombre.";
        }
      })
    } else {
      this.errorType = "Por favor seleccione un tipo de panel.";
    }**/
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
