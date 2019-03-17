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

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePanelPage');
  }

  createPanel() {
    this.karateService.createJudge(this.data);
    this.navCtrl.push('StartKataPage', {
      sessionName: this.data.name,
      judgesNumber: this.data.type
    });
   

  }

}
