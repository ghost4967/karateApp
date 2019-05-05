import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { CountryService } from '../../../services/country-service/country.service';
import * as jspdf from 'jspdf';

@Component({
  selector: 'ngx-event-medal-table',
  templateUrl: './event-medal-table.component.html',
  styleUrls: ['./event-medal-table.component.scss']
})

export class EventMedalTableComponent implements OnInit {
  readonly category = 'general';
  eventId;
  countries;
  medalTable = [];
  displayTable = [];
  isDataSaved = false;

  constructor(private competitionService: CompetitionService,
    private countryService: CountryService,
    private route: ActivatedRoute) {
    this.eventId = route.snapshot.paramMap.get('eventId');
  }

  ngOnInit() {
    this.countryService.getCountriesByEvent(this.eventId).subscribe(
      response => {
        this.countries = response.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          };
        });
        this.getGeneralMedalTable();
      }
    );
  }

  getGeneralMedalTable() {
    this.competitionService.getMedalTable(this.eventId, this.category).subscribe(
      (response: any) => {
        this.buildBasicTable();
        if (response.length > 0) {
          this.isDataSaved = true;
          this.displayTable = response[0].data;
        } else {
          this.buildData();
        }
      }
    );
  }

  buildData() {
    this.competitionService.getEventMedalTables(this.eventId).subscribe(
      (response: any) => {
        response.forEach(result => {
          var medalData = result.data;
          medalData.forEach(element => {
            if (element.place < 4) {
              this.addMedal(element.country, element.place);
            }
          });
        });
        this.sortAndBuildDisplayTable();
      }
    );
    console.log(this.medalTable);
  }

  addMedal(country, place) {
    switch (place) {
      case 1: this.medalTable[country.id].gold++; break;
      case 2: this.medalTable[country.id].silver++; break;
      case 3: this.medalTable[country.id].bronze++; break;
    }
  }

  buildBasicTable() {
    this.countries.forEach(country => {
      this.medalTable[country.id] = {
        country: country.name,
        gold: 0,
        silver: 0,
        bronze: 0
      }
    });
  }

  sortAndBuildDisplayTable() {
    for(var index in this.medalTable){
      var element = this.medalTable[index];
      this.displayTable.push(element);
    }
    this.displayTable = this.displayTable.sort(
      (country1, country2) => {
        var comparison = this.compareMedals(country1, country2);
        return comparison;
      }
    );
    console.log(this.displayTable);
  }

  compareMedals(country1, country2) {
    if (country1.gold > country2.gold) {
      return -1;
    } else if (country1.gold === country2.gold) {
      if (country1.silver > country2.silver) {
        return -1;
      } else if (country1.silver === country2.silver) {
        if (country1.bronze > country2.bronze) { return -1; }
        else { return 1; }
      } else { return 1; }
    } else { return 1; }
  }

  exportPdf() {
    this.saveMedalTable();
    var pdf = new jspdf('p', 'pt', 'letter');
    var data = document.getElementById('medal-table');
    var margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
    };
    pdf.fromHTML(
      data,
      margins.left,
      margins.top, {
        'width': margins.width
      },
      (dispose) => {
        let pdfName = this.category + '.pdf'
        pdf.save(pdfName);
      }
      , margins);
  }

  saveMedalTable() {
    if (!this.isDataSaved) {
      this.isDataSaved = true;
      this.competitionService.saveMedalTable(this.eventId, this.category, this.displayTable);
    }
  }

}
