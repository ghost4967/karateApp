import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Competitor } from '../../models/competitor';

@Injectable({
  providedIn: 'root'
})
export class CompetitorService {

  constructor(private storeFirebase: AngularFirestore) { }

  getCompetitorsByCountry(countryId: string) {
    return this.storeFirebase.collection('competitors', ref => ref.where("countryId", "==", countryId)).snapshotChanges();
  }

  createCompetitor(competitor: Competitor) {
    return this.storeFirebase.collection('competitors').add(Object.assign({}, competitor));
  }
}
