import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Country } from '../../models/country';
import { Competitor } from '../../models/competitor';
import { OfflineCompetitor } from '../../models/offline-competitor';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient,  private storeFirebase: AngularFirestore) { }

  getCountries() {
    return this.http.get('assets/data/countries.json');
  }

  getCountriesByEvent(eventId: string) {
    return this.storeFirebase.collection('countries', ref => ref.where("eventId", "==", eventId)).snapshotChanges();
  }

  addCountriesToEvent(countries: Array<Country>) {
    countries.forEach(country => {
      return this.storeFirebase.collection('countries').add(Object.assign({}, country));
    });
  }

  getCountryById(countryId: string) {
    return this.storeFirebase.doc('countries/' + countryId).snapshotChanges();
  }

  buildOfflineCompetitorList(countries: Array<Country>, competitors: Array<Competitor>) {
    let offlineCompetitorList = new Array<Array<OfflineCompetitor>>();
    countries.forEach(country => {
      let data = competitors.filter(competitor => competitor.countryId == country.id);
      let competitorOfflineArray = new Array<OfflineCompetitor>();
      data.forEach(competitor => {
        let offlineCompetitor = new OfflineCompetitor();
        offlineCompetitor.competitor = competitor;
        offlineCompetitor.country = country;
        competitorOfflineArray.push(offlineCompetitor);
      });
      offlineCompetitorList.push(competitorOfflineArray);
    });
    return offlineCompetitorList;
  }



}
