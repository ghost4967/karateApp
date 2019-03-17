import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class KarateService {

  panels: any;
  joinpanel: any;
  numberArray = [5,6,7,8,9,10];
  pairNumberArray = [0,2,4,6,8]
  

  items: Observable<any[]>;
  private noteListRef = this.firebase.list<any>('/JohnFinalKarate');


  constructor(public http: HttpClient, private firebase: AngularFireDatabase) {
    console.log('Hello KarateProvider Provider');
  }

  getPassword(): any {
    return new Observable(observer => {
      this.firebase
        .object('JohnFinalKarate/password')
        .valueChanges()
        .subscribe(snapshot => {
          observer.next(snapshot);
          observer.complete();
        }, err => {
          observer.error([]);
          observer.complete();
        });
    });
  }

  createPanel(panel: any) {
    this.panels = this.firebase.database.ref('/JohnFinalKarate' + '/' + panel.name)
    .set({
      judges: panel.type,
      states: [
        {
          start: false,
          restart: false
        }
      ]
    });
  }

  createGrade(grade, sessionName, judge) {
    console.log(parseFloat(grade.phisicLevel));
    console.log(parseFloat(grade.tecnicLevel));
    this.panels = this.firebase.database.ref('/JohnFinalKarate' + '/' + sessionName+'/Grades/' + judge)
    .set({
      Fisico: parseFloat(grade.phisicLevel),
      Nombre: judge,
      Tecnico: parseFloat(grade.tecnicLevel)
    });
    this.firebase.database.ref('/JohnFinalKarate' + '/' + sessionName+'/Sent/'+ judge)
    .set(true);
  }

  joinToPanel(formData) {
    this.joinpanel = this.firebase.database
    .ref('/JohnFinalKarate' + '/' + formData.sessionName + '/' + 'Group' + '/' + formData.judgeName)
    .set({value: "true",
        Nombre: formData.judgeName});
  }

  getByName(sessionName): any {
    this.items = this.firebase.list('JohnFinalKarate/'+sessionName+'/Group/').valueChanges();
    return this.items;
  }

  getNumberOfJudges(sessionName): any {
    return new Observable(observer => {
      this.firebase
        .object('JohnFinalKarate/'+sessionName+'/judges/')
        .valueChanges()
        .subscribe(snapshot => {
          observer.next(snapshot);
          observer.complete();
        }, err => {
          observer.error([]);
          observer.complete();
        });
    });
  }

  getStatusBySession(sessionName): any {
    return this.firebase.list('JohnFinalKarate/'+sessionName+'/states/').valueChanges();
  }

  startGrading(sessionName) {
    this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'states' + '/0' )
    .set({
      start: true
    });
  }

  getGradeList(): any {
    let finalList: Array<any> = new Array();
    this.numberArray.forEach(element => {
      this.pairNumberArray.forEach(value => {
        if (element != 10) {
          finalList.push({
            "value": element + '.' + value
          })
        }
      });
    });
    finalList.push({
      "value": '10.0'
    });
    return finalList;
  }

}
