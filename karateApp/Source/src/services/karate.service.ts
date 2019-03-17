import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class KarateService {

  panels: any;
  joinpanel: any;

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

  joinToPanel(judge: any, panels) {
    this.joinpanel = this.firebase.database
    .ref('/JohnFinalKarate' + '/' + panels + '/' + 'Group' + '/' + judge)
    .set({value: "true"});
  }
}
