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

  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService) {
    this.params.data = {
      "yourName": "Nombre del panel",
      "title": "Title",
      "description": "Enter a description",
      "button": " Crear"
    }

    this.params.events = {
      "onSubmit": function (item: any) {
          console.log(this);
      }
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePanelPage');
  }

}
