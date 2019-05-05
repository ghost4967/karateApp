import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../../models/categorie';
import { EventService } from '../../../services/event-service/event.service';
import { Competitor } from '../../../models/competitor';
import { Event } from '../../../models/event';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-competitor-register',
  templateUrl: './competitor-register.component.html',
  styleUrls: ['./competitor-register.component.scss']
})
export class CompetitorRegisterComponent implements OnInit {
  addCompetitorForm: FormGroup;
  nameEvent: string;
  eventId: string;
  countryId: string;
  categories: Categorie[];
  competitor: Competitor = new Competitor();

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private competitorService: CompetitorService,
    private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.eventId = activatedRoute.snapshot.paramMap.get('eventId');
    this.countryId = activatedRoute.snapshot.paramMap.get('countryId');
   }

  ngOnInit() {
    this.eventService.getEventById(this.eventId).subscribe(data => {
      let event = {
        id: data.payload.id,
        ...data.payload.data()
      } as Event;
      this.categories = event.categories;
      //this.categories.filter(categorie => categorie.gender == "single");
      this.addCompetitorForm = this.buildAddCompetitorForm();
      this.nameEvent = event.name;
    });
  }

  onChange(gender) {
    this.categories.filter(categorie => categorie.gender == gender);
  }

  buildAddCompetitorForm() {
     return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      secondLastName: [''],
      birthDate: [''],
      ci: [''],
      gender: ['', Validators.required],
      categorie: ['', Validators.required],
      eventId: this.eventId,
     countryId: this.countryId
    });
  }

  get name() {
    return this.addCompetitorForm.get('name');
  }

  get lastName() {
    return this.addCompetitorForm.get('lastName');
  }

  get gender() {
    return this.addCompetitorForm.get('gender');
  }

  get categorie() {
    return this.addCompetitorForm.get('categorie');
  }

  goToAddCountries() {
    return this.router.navigate([`/pages/events/${this.eventId}/add-countries/${this.countryId}`]);
  }

  registerCompetitor() {
    if (this.competitor.secondLastName === undefined) {
      delete this.competitor.secondLastName;
    }
    if (this.competitor.birthDate === undefined) {
      delete this.competitor.birthDate;
    }
    if (this.competitor.ci === undefined) {
      delete this.competitor.ci;
    }
    this.competitor.eventId = this.eventId;
    this.competitor.countryId = this.countryId;
    this.competitorService.createCompetitor(this.competitor);
    this.toastr.success("exitosamente.", "Competidor registrado ");
    this.goToAddCountries();
  }
}
