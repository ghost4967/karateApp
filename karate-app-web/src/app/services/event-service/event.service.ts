import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Event } from '../../models/event';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private firebase: AngularFireDatabase, 
    private storeFirebase: AngularFirestore) { }

  getCategories() {
    return this.http.get('assets/data/categories.json');
  }

  createEvent(event: Event) {
    return this.storeFirebase.collection('events').add(Object.assign({}, event));
  }

  getEvents() {
    return this.storeFirebase.collection('events').snapshotChanges();
  }

 
}
