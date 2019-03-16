import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';

/**
 * Generated class for the JoinSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join-sesion',
  templateUrl: 'join-sesion.html',
  providers: [KarateService]
})
export class JoinSesionPage {

  params: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
    this.params.data = {
      "sesionCode": "Codigo de sesion",
      "username": "Nombre de Juez",
      "button": "Unirse",
      "logo": "assets/images/icon-KataManager/bandera.png"
   }

  this.params.events = {
    "onSubmit": function (item: any) {
        console.log(this);
    }
  };
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinSesionPage');
  }

}
