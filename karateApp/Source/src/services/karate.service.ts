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
  grades: Observable<any[]>;
  private noteListRef = this.firebase.list<any>('/JohnFinalKarate');


  constructor(public http: HttpClient, private firebase: AngularFireDatabase) {
    console.log('Hello KarateProvider Provider');
  }

  getPasswordKArata(): any {
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
    .update({
      judges: panel.type,
      states: [
        {
          start: false,
          restart: false
        }
      ]
    });
  }

  restartSession(sessionName) {
    this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'states' + '/0' )
    .set({
      restart: true,
      start: false
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
    this.firebase.database.ref('/JohnFinalKarate' + '/' + sessionName+'/Group/'+ judge+'/value')
    .set(true);
  }

  joinToPanel(formData) {
    this.joinpanel = this.firebase.database
    .ref('/JohnFinalKarate' + '/' + formData.sessionName + '/' + 'Group' + '/' + formData.judgeName)
    .set({value: false,
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

  getGrades(sessionName): any {
    this.grades = this.firebase.list('JohnFinalKarate/'+sessionName+'/Grades/').valueChanges();
    return this.grades;
  }

  getStatusBySession(sessionName): any {
    return this.firebase.list('JohnFinalKarate/'+sessionName+'/states/').valueChanges();
  }

  startGrading(sessionName) {
    this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'states' + '/0' )
    .set({
      start: true,
      restart: false
    });
  }

  restartJudgeStatus(sessionName, judgeName) {
    this.joinpanel = this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'Group' + '/' + judgeName+'/value')
    .set(false);
  }

  getGradeList(): any {
    let finalList: Array<any> = new Array();
    this.numberArray.forEach(element => {
      this.pairNumberArray.forEach(value => {
        if (element != 10) {
          finalList.push({
            description: element + '.' + value
          })
        }
      });
    });
    finalList.push({
      description: '10.0'
    });
    return finalList;
  }

  getPanelName(sessionName): any {
    return new Observable(observer => {
      this.firebase
        .object('JohnFinalKarate/'+sessionName)
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
  judgeExist(sessionName, judgeName): any {
    return new Observable(observer => {
      this.firebase
        .object('JohnFinalKarate/'+sessionName+'/Group/'+judgeName)
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

  deleteJudgeBySession(sessionName, judgeName) {
    this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'Group/' + judgeName )
    .remove();
    this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'Grades/' + judgeName )
    .remove();
    this.panels = this.firebase.database.ref('/JohnFinalKarate' + '/' + sessionName + '/states/0/')
    .update({
      start: false
    });
    
  }

}
