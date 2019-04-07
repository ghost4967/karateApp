import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private firebase: AngularFireDatabase) { }

  getCategories() {
    return this.http.get('assets/data/categories.json');
  }

  createEvent(event) {
    this.firebase.database.ref('/JohnFinalKarate' + '/' + event.name)
    .update({
      name: event.name,
      caracteristic: event.caracteristic,
      description: event.description,
      organizer: event.organizer,
      country: event.country,
      city: event.city,
      startDate: event.startDate,
      endDate: event.endDate,
      categories: event.categories
    });
  }

 
}
