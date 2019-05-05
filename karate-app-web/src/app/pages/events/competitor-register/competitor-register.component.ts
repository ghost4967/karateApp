import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../../models/categorie';
import { EventService } from '../../../services/event-service/event.service';
import { Competitor } from '../../../models/competitor';
import { Event } from '../../../models/event';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-competitor-register',
  templateUrl: './competitor-register.component.html',
  styleUrls: ['./competitor-register.component.scss']
})
export class CompetitorRegisterComponent implements OnInit {
  competitorForm: FormGroup;
  eventId: string;
  countryId: string;
  categories: Categorie[];
  competitor: Competitor = new Competitor();

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private competitorService: CompetitorService,
    private formBuilder: FormBuilder, private router: Router) {
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
      this.competitorForm = this.buildCompetitorForm();
    });
  }

  onChange(gender) {
    this.categories.filter(categorie => categorie.gender == gender);
  }

  buildCompetitorForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      secondLastName: [''],
      birthDate: [''],
      ci: [''],
      gender: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      eventId: this.eventId,
      countryId: this.countryId

    });
  }

  goToAddCountries() {
    return this.router.navigate([`/pages/events/${this.eventId}/add-countries/${this.countryId}`]);
  }

  registerCompetitor() {
    this.competitor.eventId = this.eventId;
    this.competitor.countryId = this.countryId;
    this.competitorService.createCompetitor(this.competitor);
    this.goToAddCountries();
  }

}
