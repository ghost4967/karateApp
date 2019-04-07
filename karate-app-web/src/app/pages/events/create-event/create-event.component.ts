import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EventService } from '../../../services/event-service/event.service';

@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;

  event: Event = new Event;
  categories: any;

  constructor(private formBuilder: FormBuilder, private eventService: EventService) { 
    this.eventService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnInit() {
    this.createEventForm = this.formBuilder.group({
      createEventControl: ['', Validators.required],
    });
  }

  createEvent() {
    console.log(this.event);
    this.event.categories = this.categories.filter(categorie => categorie.check);
    this.eventService.createEvent(this.event);
  }

}
