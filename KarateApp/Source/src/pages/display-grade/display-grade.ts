import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { Element } from '@angular/compiler';
import { filterQueryId } from '@angular/core/src/view/util';


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
  gradeList:Array<any>;
  orderTecnico:Array<any>;
  orderFisico:Array<any>;
  tecnicoPintar:Array<any>;
  fisicoPintar:Array<any>;
  tecnicoPromedio:Array<any>;
  fisicoPromedio:Array<any>;
  promedioTecnico:any;
  promedioFisico:any;
  promedio:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: KarateService) {
    //this.sessionName = navParams.get('sessionName');
    this.sessionName = 'john2';
    this.orderFisico = new Array();
    this.orderTecnico = new Array();
    this.tecnicoPintar = new Array();
    this.fisicoPintar = new Array();
    this.tecnicoPromedio = new Array();
    this.fisicoPromedio = new Array();
  }

  ionViewDidLoad() {
    this.service.getGrades(this.sessionName).subscribe(data => {
      this.gradeList = data;
      this.gradeList.forEach(element => {
        this.orderTecnico.push(element.Tecnico);
        this.orderFisico.push(element.Fisico);      
      });
      if(this.orderFisico.length === 7) {
        this.fisicoPintar.push(this.orderFisico[0]);
        this.fisicoPintar.push(this.orderFisico[1]);
        this.fisicoPintar.push(this.orderFisico[5]);
        this.fisicoPintar.push(this.orderFisico[6]);
        this.fisicoPromedio.push(this.orderFisico[2]);
        this.fisicoPromedio.push(this.orderFisico[3]);
        this.fisicoPromedio.push(this.orderFisico[4]);
        this.promedioFisico = this.average(this.fisicoPromedio);

        this.tecnicoPintar.push(this.orderTecnico[0]);
        this.tecnicoPintar.push(this.orderTecnico[1]);
        this.tecnicoPintar.push(this.orderTecnico[5]);
        this.tecnicoPintar.push(this.orderTecnico[6]);
        this.tecnicoPromedio.push(this.orderTecnico[2]);
        this.tecnicoPromedio.push(this.orderTecnico[3]);
        this.tecnicoPromedio.push(this.orderTecnico[4]);
        this.promedioTecnico = this.average(this.tecnicoPromedio);
        this.promedio = this.total(this.promedioTecnico, this.promedioFisico);
      }
      if(this.orderFisico.length === 5) {
        this.fisicoPintar.push(this.orderFisico[0]);
        this.fisicoPintar.push(this.orderFisico[4]);
        this.fisicoPromedio.push(this.orderFisico[1]);
        this.fisicoPromedio.push(this.orderFisico[2]);
        this.fisicoPromedio.push(this.orderFisico[3]);
        this.promedioFisico = this.average(this.fisicoPromedio);

        this.tecnicoPintar.push(this.orderTecnico[0]);
        this.tecnicoPintar.push(this.orderTecnico[4]);
        this.tecnicoPromedio.push(this.orderTecnico[1]);
        this.tecnicoPromedio.push(this.orderTecnico[2]);
        this.tecnicoPromedio.push(this.orderTecnico[3]);
        this.promedioTecnico = this.average(this.tecnicoPromedio);
        this.promedio = this.total(this.promedioTecnico, this.promedioFisico);

        this.orderFisico.indexOf(this.tecnicoPintar[0]);

        console.log("index order fisico");
        //el array fisico pintar es el q contiene los elementos que se deben marcar con rojo en la vista
        // los elementos se ven asi => <h2 id="fisico0"> 
        console.log(this.orderFisico.indexOf(this.fisicoPintar[0]));
        let x = this.orderFisico.indexOf(this.fisicoPintar[0]);
        let y = 'fisico'.concat(x.toString());
        //hasta aqui ya esta el id dentro de la variable y
        document.getElementById('fisico0').setAttribute('color','red');
        console.log(this.orderFisico);
        console.log(this.fisicoPintar);

      }
    })
  }  

  average(list:Array<any>) {
    let count = 0;
    let size = list.length;
    list.forEach(element => {
      count = count + element;
    });
    return (count / size).toFixed(2);
  }

  total(tecnico:number, fisico:number) {
    tecnico = (tecnico * 70) / 100;
    fisico = (fisico * 30) / 100;
    return (tecnico + fisico).toFixed(2);
  }

  orderList(gradeList) { 
    gradeList.forEach(element => {
      this.orderTecnico = element;
    });
    gradeList.array.forEach(element => {
      this.orderFisico = element;
    });
    console.log("notas"+this.orderTecnico);
    console.log('ionViewDidLoad DisplayGradePage'+this.orderFisico);
  }

}
