import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class KarateService {

  panels: any;
  joinpanel: any;

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

  createJudge(panel: any) {
    this.panels = this.firebase.database.ref('/JohnFinalKarate' + '/' + panel.name)
    .set({
      judges: panel.type,
    });
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

}
