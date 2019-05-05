import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Country } from '../../../models/country';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../services/country-service/country.service';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';
import { Competitor } from '../../../models/competitor';
import { Team } from '../../../models/team';
import { NbDialogService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-country-profile',
  templateUrl: './country-profile.component.html',
  styleUrls: ['./country-profile.component.scss']
})
export class CountryProfileComponent implements OnInit {

  country: Country = new Country();
  countryId: string;
  eventId: string;
  competitors: Competitor[];
  teams: Team[];

  constructor(private route: ActivatedRoute, private countryService: CountryService, 
    private dialogService: NbDialogService, private competitorService: CompetitorService,
    private toastr: ToastrService) { 
    this.countryId = route.snapshot.paramMap.get('countryId');
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.competitorService.getCompetitorsByCountry(this.countryId).subscribe(data => {
      this.competitors = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Competitor;
      });
    });

    this.competitorService.getTeamsByCountry(this.countryId).subscribe(data => {
      this.teams = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Team;
      });
    });
  }

  ngOnInit() {
    this.countryService.getCountryById(this.countryId).subscribe(data => {
      this.country = {
        id: data.payload.id,
        ...data.payload.data()
      } as Country;
    });
  }

  open(dialog: TemplateRef<any>, name, lastName) {
    this.dialogService.open(dialog, { context: 'Esta seguro que desea eliminar a ' + name+ ' '+lastName +'?' });
  }

  deleteCompetitors(competitor, ref) {
    this.competitorService.deleteCompetitor(competitor);
    ref.close()
    this.toastr.success('exitosamente.', 'Competidor eliminado');
  }

}
