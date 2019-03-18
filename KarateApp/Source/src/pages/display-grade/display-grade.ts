import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { Element } from '@angular/compiler';


/**
 * Generated class for the DisplayGradePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-grade',
  templateUrl: 'display-grade.html',
  providers: [KarateService]
})
export class DisplayGradePage {

  sessionName:string;
  gradeList:any;
  orderTecnico:any;
  orderFisico:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    this.sessionName = navParams.get('sessionName');
  }

  ionViewDidLoad() {
    this.service.getGrades(this.sessionName).subscribe(data => {
      this.gradeList = data;
      console.log("notasasdsad"+this.gradeList);
    })
    this.orderList(this.gradeList);
    console.log("notas"+this.orderTecnico);
    console.log('ionViewDidLoad DisplayGradePage'+this.orderFisico);
  }  

  orderList(gradeList: any) { 
    gradeList.forEach(element => {
      element.orderList(element.Tecnico)
      this.orderTecnico = element;
    });
    gradeList.array.forEach(element => {
      element.orderList(element.Fisico)
      this.orderFisico = element;
    });
    console.log("notas"+this.orderTecnico);
    console.log('ionViewDidLoad DisplayGradePage'+this.orderFisico);
  }

}
