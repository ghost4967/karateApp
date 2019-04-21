import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Group } from '../../models/group';
import { FirebaseCompetition } from '../../models/firebase-competition';
import { OfflineCompetitor } from '../../models/offline-competitor';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient,  private storeFirebase: AngularFirestore, private firebase: AngularFireDatabase) { }

  getKatas() {
    return this.http.get('assets/data/katas.json');
  }

  createPanel(group: Group, name: string, competition: FirebaseCompetition) {
     this.firebase.database.ref('/JohnFinalKarate' + '/' + name)
    .update({
      kata: group.kata,
      eventId: competition.eventId,
      categorie: competition.categorie,
      states: [
        {
          start: false,
          restart: false
        }
      ]
    });
  }

  addCompetitorToPanel(name: string, offlineCompetitor: OfflineCompetitor, kataName) {
    this.firebase.database
    .ref('/JohnFinalKarate' + '/' + name + '/' + 'states' + '/0' )
    .set({
      nextCompetitor: true,
      start: false,
      restart: false
    });
    this.firebase.database.ref('/JohnFinalKarate' + '/' + name)
    .update({
     competitor: offlineCompetitor,
     kataName: kataName
    });
  }

}
