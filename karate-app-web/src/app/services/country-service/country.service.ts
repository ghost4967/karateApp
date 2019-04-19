import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Country } from '../../models/country';
import { Competitor } from '../../models/competitor';
import { OfflineCompetitor } from '../../models/offline-competitor';
import { Team } from '../../models/team';
import { OfflineTeam } from '../../models/offline-team';

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

  buildOfflineTeamList(countries: Array<Country>, teams: Array<Team>) {
    let offlineTeamList = new Array<Array<OfflineTeam>>();
    countries.forEach(country => {
      let data = teams.filter(team => team.countryId == country.id);
      let teamArray = new Array<OfflineTeam>();
      data.forEach(team => {
        let offlineTeam = new OfflineTeam();
        offlineTeam.competitors = team.competitors;
        offlineTeam.country = country;
        offlineTeam.name = team.name
        teamArray.push(offlineTeam);
      });
      offlineTeamList.push(teamArray);
    });
    return offlineTeamList;
  }



}
