import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../services/country-service/country.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../../models/country';

@Component({
  selector: 'ngx-add-countries',
  templateUrl: './add-countries.component.html',
  styleUrls: ['./add-countries.component.scss']
})
export class AddCountriesComponent implements OnInit {

  defaultCountries: Array<any> = new Array();
  eventId: string;
  countries: Country[];
  countriesToAdd: Array<Country> = new Array();
  allCountries;

  constructor(private countryService: CountryService, private route: ActivatedRoute) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.countryService.getCountries().subscribe(data => {
      this.defaultCountries = <Array<any>>data;
      this.allCountries = this.defaultCountries;
    });
    this.countryService.getCountriesByEvent(this.eventId).subscribe(data => {
      this.countries = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Country;
      });
      this.cleanDefaultCountries();
    });
  }

  ngOnInit() {
    this.countryService.getCountriesByEvent(this.eventId).subscribe(data => {
      this.countries = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Country;
      });
      this.cleanDefaultCountries();      
    });
  }

  addToList(event) {
    let country = new Country();
    country.eventId = this.eventId;
    country.name = event.name;
    this.countriesToAdd.push(country);
  }

  removeFromList(event) {
    this.countriesToAdd =  this.countriesToAdd.filter(country => country.name != event.value.name );
  }

  addCountries() {
    this.countryService.addCountriesToEvent(this.countriesToAdd);
    this.cleanDefaultCountries();
    this.countriesToAdd = [];
  }

  cleanDefaultCountries() {
    this.countries.forEach(country => {
      let index = this.defaultCountries.findIndex(defaultCountry => defaultCountry.name == country.name);
      if (index != -1) {
        this.defaultCountries =  this.defaultCountries.filter(defaultCountry => defaultCountry.name != country.name );        
        console.log('se elimino');
      }
    });
  }

  geCountryFlag(name) {
    var country = this.allCountries.find(c => c.name === name);
    var flagClass =  'flag-icon flag-icon-' + country.code.toLowerCase() + ' flag-icon-squared';
    return flagClass;
  }

}
