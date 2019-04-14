import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Country } from '../../models/country';

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



}
