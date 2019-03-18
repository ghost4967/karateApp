import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { KarateLoginPageModule } from './karate-login.module';

@IonicPage()
@Component({
  selector: 'page-karate-login',
  templateUrl: 'karate-login.html',
  providers: [KarateService]
})
export class KarateLoginPage {
  params: any = [];
  kataPassword: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
    
    this.params.data = {
       "password": "Contraseña",
       "login": "Ingresar",
       "logo": "assets/images/icon-KataManager/LOGOKATA.png"
    }
    this.params.events = {
      onLogin: function (params) {
        karateService.getPasswordKArata().subscribe(data => {
          if (params.password === data) {
            navCtrl.push('KarateHomePage');
          }
        })
      },
   };
  }

  ionViewDidLoad() {
    
  }
}
