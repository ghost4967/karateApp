import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePanelPage');
  }

  createPanel() {
    if (this.data.type.length > 0) {
      this.karateService.getPanelName(this.data.name).subscribe(dataSesion => {
        console.log(dataSesion);
        if (!dataSesion) {
          this.karateService.createPanel(this.data);
          this.navCtrl.push('StartKataPage', {
            sessionName: this.data.name,
            judgesNumber: this.data.type
          });
        } else {
          this.error = "El panel ya existe por favor ingrese otro nombre.";
        }
      })
    } else {
      this.errorType = "Por favor seleccione un tipo de panel.";
    }
  }
}
