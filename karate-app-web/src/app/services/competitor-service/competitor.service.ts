import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Competitor } from '../../models/competitor';
import { Team } from '../../models/team';

@Injectable({
  providedIn: 'root'
})
export class CompetitorService {

  constructor(private storeFirebase: AngularFirestore) { }

  getCompetitorsByCountry(countryId: string) {
    return this.storeFirebase.collection('competitors', ref => ref.where("countryId", "==", countryId)).snapshotChanges();
  }

  getTeamsByCountry(countryId: string) {
    return this.storeFirebase.collection('teams', ref => ref.where("countryId", "==", countryId)).snapshotChanges();
  }

  getCompetitorsByCategorie(eventId: string, categorie: string) {
    return this.storeFirebase.collection('competitors', ref => ref.where("eventId", "==", eventId)
    .where("categorie.name", "==", categorie)).snapshotChanges();    
  }

  getTeamsByCategorie(eventId: string, categorie: string) {
    return this.storeFirebase.collection('teams', ref => ref.where("eventId", "==", eventId)
    .where("categorie.name", "==", categorie)).snapshotChanges();  
  }

  createCompetitor(competitor: Competitor) {
    return this.storeFirebase.collection('competitors').add(Object.assign({}, competitor));
  }

  deleteCompetitor(competitor: Competitor) {
    return this.storeFirebase.collection('competitors').doc(competitor.id).delete();
  }

  createTeam(team: Team) {
    const competitors = team.competitors.map((obj) => { return Object.assign({}, obj) });
    team.competitors = competitors;
    return this.storeFirebase.collection('teams').add(Object.assign({}, team));

  }
}
