import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../services/country-service/country.service';

@Component({
  selector: 'ngx-add-countries',
  templateUrl: './add-countries.component.html',
  styleUrls: ['./add-countries.component.scss']
})
export class AddCountriesComponent implements OnInit {

  countries: any;

  constructor(private countryService: CountryService) {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }

  ngOnInit() {
  }

}
