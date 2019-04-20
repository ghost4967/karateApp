import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { KarateLoginPageModule } from './karate-login.module';

@IonicPage()
@Component({
  selector: 'page-karate-login',
  templateUrl: 'karate-login.html',
  providers: []
})
export class KarateLoginPage {
  data: any;
  kataPassword: string;
  
  public password: string;

  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService ,
              public viewController:ViewController) {
    
  }

  ionViewDidLoad() {
    this.karateService.getPassword().subscribe(data => {
      this.kataPassword = data;
    })

  }

  login() {
    if(this.validate()) {
      this.navCtrl.setRoot('KarateHomePage');
      this.navCtrl.popToRoot();
    }

  }

  validate():boolean {
    this.isPasswordValid = true;
    if(this.password !== this.kataPassword) {
      this.isPasswordValid = false;
    }    
    return this.isPasswordValid;
 }
}
