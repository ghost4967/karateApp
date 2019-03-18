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
  judgeList: Array<any>;
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
    this.sessionName = navParams.get('sessionName');
    this.orderFisico = new Array();
    this.orderTecnico = new Array();
    this.tecnicoPintar = new Array();
    this.fisicoPintar = new Array();
    this.tecnicoPromedio = new Array();
    this.fisicoPromedio = new Array();
    this.service.getByName(this.sessionName).subscribe(data => {
      this.judgeList = data;
    })
  }

  ionViewDidLoad() {
    this.service.getGrades(this.sessionName).subscribe(data => {
      this.gradeList = data;
      this.gradeList.forEach(element => {
        this.orderTecnico.push(element.Tecnico);
        this.orderFisico.push(element.Fisico);      
      });
      this.orderFisico = this.sortList(this.orderFisico);
      this.orderTecnico = this.sortList(this.orderTecnico);
      if(this.orderFisico.length === 7) {
        this.fisicoPintar.push(this.orderFisico[0]);
        this.fisicoPintar.push(this.orderFisico[1]);
        this.fisicoPintar.push(this.orderFisico[5]);
        this.fisicoPintar.push(this.orderFisico[6]);
        this.fisicoPromedio.push(this.orderFisico[2]);
        this.fisicoPromedio.push(this.orderFisico[3]);
        this.fisicoPromedio.push(this.orderFisico[4]);
        this.promedioFisico = this.averageFisico(this.fisicoPromedio);

        this.tecnicoPintar.push(this.orderTecnico[0]);
        this.tecnicoPintar.push(this.orderTecnico[1]);
        this.tecnicoPintar.push(this.orderTecnico[5]);
        this.tecnicoPintar.push(this.orderTecnico[6]);
        this.tecnicoPromedio.push(this.orderTecnico[2]);
        this.tecnicoPromedio.push(this.orderTecnico[3]);
        this.tecnicoPromedio.push(this.orderTecnico[4]);
        this.promedioTecnico = this.averageTecnico(this.tecnicoPromedio);
        this.promedio = this.total(this.promedioTecnico, this.promedioFisico);
      }
      if(this.orderFisico.length === 5) {
        this.fisicoPintar.push(this.orderFisico[0]);
        this.fisicoPintar.push(this.orderFisico[4]);
        this.fisicoPromedio.push(this.orderFisico[1]);
        this.fisicoPromedio.push(this.orderFisico[2]);
        this.fisicoPromedio.push(this.orderFisico[3]);
        this.promedioFisico = this.averageFisico(this.fisicoPromedio);

        this.tecnicoPintar.push(this.orderTecnico[0]);
        this.tecnicoPintar.push(this.orderTecnico[4]);
        this.tecnicoPromedio.push(this.orderTecnico[1]);
        this.tecnicoPromedio.push(this.orderTecnico[2]);
        this.tecnicoPromedio.push(this.orderTecnico[3]);
        this.promedioTecnico = this.averageTecnico(this.tecnicoPromedio);
        this.promedio = this.total(this.promedioTecnico, this.promedioFisico);

        this.orderFisico.indexOf(this.tecnicoPintar[0]);
      }
    })
  }  

  averageTecnico(list:Array<any>) {
    let count = 0;
    let size = list.length;
    list.forEach(element => {
      count = count + element;
    });
    return ((count * 70) / 100).toFixed(2);
  }

  averageFisico(list:Array<any>) {
    let count = 0;
    let size = list.length;
    list.forEach(element => {
      count = count + element;
    });
    return ((count * 30) / 100).toFixed(2);
  }

  total(tecnico:any, fisico:any) {
    var total = Number(tecnico.toString()) + Number(fisico.toString());
    return total;
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

  restartGrading() {
    this.service.restartSession(this.sessionName);
    this.judgeList.forEach(element => {
      this.service.restartJudgeStatus(this.sessionName, element.Nombre);
    });
    this.navCtrl.push('WaitingKataManagerPage', {
      sessionName: this.sessionName
    });
  }

  sortList(array): Array<any> {
    var sortedArray = array.sort((n1,n2) => n1 - n2);
    return sortedArray;
  }

  getColorFiveLength(index, list) {
    console.log(index);
    if (index == 0 || (list.length - 1 == index)) {
      return 'red'
    } else {
      return '#0090d0';
    }
  }

  getColorSevenLength(index, list) {
    console.log(index);
    if (index == 0 || (list.length - 1 == index) 
        || index == 1 || (list.length - 2 == index)) {
      return 'red'
    } else {
      return '#0090d0';
    }
  }

  getColor(index, list) {
    if (list.length == 5) {
      return this.getColorFiveLength(index, list);
    } else {
      return this.getColorSevenLength(index, list);
    }
  }

}
