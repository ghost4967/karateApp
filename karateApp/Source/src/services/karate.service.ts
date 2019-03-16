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
    this.panels = this.firebase.list('/JohnFinalKarate' + '/' + panel.name);

    let data = {
      judges: panel.type,
    }

    this.panels.push(data);
  }

  joinToPanel(judge: any, panels) {
    this.joinpanel = this.firebase.list('/JohnFinalKarate' + '/' + panels + '/' + 'Group');
    let data = {
      name: judge,
      value: "true"
    }
    this.joinpanel.push(data);
  }

}
