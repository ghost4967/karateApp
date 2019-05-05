import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Group } from '../../models/group';
import { FirebaseCompetition } from '../../models/firebase-competition';
import { OfflineCompetitor } from '../../models/offline-competitor';
import { Competitor } from '../../models/competitor';
import { Observable } from 'rxjs/Observable';

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

  getGrade(sessionName: any) {
    return new Observable(observer => {
      this.firebase
        .object('JohnFinalKarate/'+sessionName+'/competitor/grade')
        .valueChanges()
        .subscribe(snapshot => {
          observer.next(snapshot);
        }, err => {
          observer.error([]);
          observer.complete();
        });
    });
  }

  restartSession(sessionName) {
    this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'states' + '/0' )
    .set({
      restart: true,
      start: false,
      nextCompetitor: false
    });
  }

  getJudgesBySessionName(sessionName): any {
   return this.firebase.list('JohnFinalKarate/'+sessionName+'/Group/').valueChanges();
    
  }

  restartJudgeStatus(sessionName, judgeName) {
     this.firebase.database
    .ref('/JohnFinalKarate' + '/' + sessionName + '/' + 'Group' + '/' + judgeName+'/value')
    .set(false);
  }

  createCompetitorGrade(competitor: Competitor, grade: any, kataNumber : number) {
    this.storeFirebase.collection('competitorgrade').add({
       competitor: competitor,
       grade: grade,
      kata: kataNumber});
  }

  getCompetitorGradeById(competitorId: string, kataNumber: number) {
    return this.storeFirebase.collection('competitorgrade', ref => ref.where("competitor.competitor.id", "==", competitorId)
    .where("kata", "==",kataNumber)).snapshotChanges();
  }

  updateCompetitionById(competition) {
    this.storeFirebase.collection('competitions').doc(competition.id).update(competition);
  }

  updateKataNumber(competition: FirebaseCompetition) {
    let nextKata = competition.numberOfKatas - 1;
    let nextGroups = competition.groups.filter(group => group.kata == nextKata);
    let allGroupsGraded = nextGroups.every(group => group.competitors.length == 4);
    competition.numberOfKatas = allGroupsGraded ? nextKata : competition.numberOfKatas;
    this.storeFirebase.collection('competitions').doc(competition.id).update(competition);
  }

  getByEvent(eventId: string) {
    return this.storeFirebase.collection('competitions', ref => ref.where("eventId", "==", eventId)).snapshotChanges();
  }

}
