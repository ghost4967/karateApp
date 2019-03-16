import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-karate-login',
  templateUrl: 'karate-login.html',
})
export class KarateLoginPage {
  params: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = {
       "password": "Contraseña",
       "login": "Ingresar",
       "logo": "assets/images/icon-KataManager/LOGOKATA.png"
    }
    this.params.events = {
      onLogin: function (params) {
         if (params.password === "kata") {
           navCtrl.push('KarateHomePage');
         }
      },
   };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KarateLoginPage');
  }
}
