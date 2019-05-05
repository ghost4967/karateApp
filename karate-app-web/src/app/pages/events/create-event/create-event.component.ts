import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { EventService } from '../../../services/event-service/event.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;

  event: Event = new Event();
  categories: any;

  constructor(private formBuilder: FormBuilder, private eventService: EventService,
    private router: Router, private toastr: ToastrService) { 
    this.eventService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnInit() {
    this.createEventForm = this.buildCreateEventForm();
  }

  buildCreateEventForm () {
    return this.formBuilder.group({
      createEventControl: [''],
      name: ['',  [Validators.required]],
      caracteristic: [''],
      description: [''],
      organizer: [''],
      country: [''],
      city: [''],
      startDate: [''],
      endDate: [''],
      categorie: ['']
    });
  }

  buildCataForm() {
    return this.formBuilder.group({
      categorie: ['', [Validators.required]]
    })
  }

  get name() {
    return this.createEventForm.get('name');
  }

  createEvent() {
    console.log(this.event);
    this.event.categories = this.categories.filter(categorie => categorie.check);
    if (this.event.caracteristic === undefined) {
      delete this.event.caracteristic;
    }
    if (this.event.city === undefined) {
      delete this.event.city;
    }
    if (this.event.country === undefined) {
      delete this.event.country;
    }
    if (this.event.description === undefined) {
      delete this.event.description;
    }
    if (this.event.organizer === undefined) {
      delete this.event.organizer;
    }
    if (this.event.startDate === undefined) {
      delete this.event.startDate;
    }
    if (this.event.endDate === undefined) {
      delete this.event.endDate;
    }
    if(this.event.categories.length === 0){
      this.event.categories = undefined
      this.toastr.error("tienes que agregar por lo menos un grupo.");
    }

    this.eventService.createEvent(this.event)
    .then(data => {
      this.toastr.success('Evento creado exitosamente.');
      this.gotEventList();
    });
  }

  gotEventList () {
    this.router.navigate(['/pages/events/event-list']);
  }
}
