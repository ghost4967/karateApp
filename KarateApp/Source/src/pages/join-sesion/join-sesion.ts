import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

@IonicPage()
@Component({
  selector: 'page-join-sesion',
  templateUrl: 'join-sesion.html',
  providers: [KarateService]
})
export class JoinSesionPage {

  data = {
    judgeName: '',
    sessionName: ''
  };
  error: string;
  errorName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinSesionPage');
  }

  joinToSession() {
    if(this.data.sessionName.length != 0 && this.data.judgeName.length != 0) {
      this.karateService.getPanelName(this.data.sessionName).subscribe(dataSesion => {
        if (!dataSesion) {
          this.error = 'El panel no existe por favor intente de nuevo.';
          this.errorName = '';
        }
      })
      this.karateService.judgeExist(this.data.sessionName, this.data.judgeName).subscribe(dataJudge => {
         if (dataJudge){
           console.log(dataJudge);
           this.error = '';
           this.errorName = 'El juez ya existe por favor ingrese otro';
         } else {
           this.karateService.joinToPanel(this.data);
           console.log("Guardandojuez");
            this.navCtrl.push('WaitingKataPage',{
            sessionName: this.data.sessionName,
            judgeName: this.data.judgeName
          });
        }
      })
     } 
    else {
      this.errorName = 'El nombre es requerido por favor intente de nuevo.';
      this.error = 'El panel es requerido por favor intente de nuevo.';
    }
  }

}
