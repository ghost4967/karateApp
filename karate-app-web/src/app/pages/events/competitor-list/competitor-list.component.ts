import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitorService } from '../../../services/competitor-service/competitor.service';
import { Competitor } from '../../../models/competitor';
import { OfflineCompetitor } from '../../../models/offline-competitor';
import { CountryService } from '../../../services/country-service/country.service';
import { Country } from '../../../models/country';
import { Competition } from '../../../models/competition';
import { SortService } from '../../../services/sort-service/sort.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { Group } from '../../../models/group';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { TeamFirebaseCompetition } from '../../../models/team-firebase-competition';
import { TeamGroup } from '../../../models/team-group';
import { OfflineTeam } from '../../../models/offline-team';
import { Team } from '../../../models/team';

@Component({
  selector: 'ngx-competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.scss']
})
export class CompetitorListComponent implements OnInit {

  eventId: string;
  categorieName: string;
  competitors: Competitor[];
  teams: Team[];
  startSort: boolean = false;
  isSingle: boolean = false;
  isTeam: boolean = false;

  listToSortGroups: Array<Array<OfflineCompetitor>> = new Array();
  listToSortTeamGroups: Array<Array<OfflineTeam>> = new Array();
  offlineCompetitors: Array<OfflineCompetitor> = new Array();
  offlineTeams: Array<OfflineTeam> = new Array();

  competition: Competition = new Competition();
  firebaseCompetition: FirebaseCompetition = new FirebaseCompetition();
  firebaseTeamCompetition: TeamFirebaseCompetition = new TeamFirebaseCompetition();

  groupArray: Array<Group>;
  blueGroups: Array<Group>;
  redGroups: Array<Group>;
  teamGroupArray: Array<TeamGroup>;
  teamBlueGroups: Array<TeamGroup>;
  teamRedGroups: Array<TeamGroup>;
  countries: Array<Country> = new Array();

  constructor(private route: ActivatedRoute, private competitorService: CompetitorService,
    private countryService: CountryService,
    private sortService: SortService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.categorieName = route.snapshot.paramMap.get('categorieName');
    this.isSingle = this.categorieName.includes("INDIVIDUAL");
    this.isTeam = this.categorieName.includes("EQUIPO");
    this.groupArray = new Array();
  }

  deleteCompetitors(competitor) {
    this.competitorService.deleteCompetitor(competitor);
  }

  ngOnInit() {
    if (this.isSingle) {
      this.competitorService.getCompetitorsByCategorie(this.eventId, this.categorieName).subscribe(data => {
        this.competitors = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Competitor;
        });
        this.competition = this.sortService.buildCompetition(this.competitors.length);
        let totalGroups = this.sortService.getTotalGroups(this.competition.numberOfKatas);
        let dividedSides = totalGroups / 2;
        this.fillBlueSide(dividedSides);
        this.fillRedSide(dividedSides);
      });
    }

    if (this.isTeam) {
      console.log('is team')
      this.competitorService.getTeamsByCategorie(this.eventId, this.categorieName).subscribe(data => {
        this.teams = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Team;
        });
        this.competition = this.sortService.buildCompetition(this.teams.length);
        let totalGroups = this.sortService.getTotalGroups(this.competition.numberOfKatas);
        let dividedSides = totalGroups / 2;
        this.fillBlueSideTeams(dividedSides);
        this.fillRedSideTeams(dividedSides);
      })
    }

    this.countryService.getCountriesByEvent(this.eventId).subscribe(data => {
      this.countries = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Country;
      });
      if (this.isSingle) {
        this.listToSortGroups = this.countryService.buildOfflineCompetitorList(this.countries, this.competitors);
        this.fillOfflineCompetitors();
        this.groupArray = this.sortService.shuffleGroups(this.listToSortGroups, this.competition.numberOfKatas, this.groupArray);
        this.blueGroups = this.groupArray.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
        this.redGroups = this.groupArray.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      }
      if (this.isTeam) {
        this.listToSortTeamGroups = this.countryService.buildOfflineTeamList(this.countries, this.teams);
        this.fillOfflineTeams();
        this.teamGroupArray = this.sortService.shuffleTeamGroups(this.listToSortTeamGroups, this.competition.numberOfKatas, this.teamGroupArray);
        this.teamBlueGroups = this.teamBlueGroups.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
        this.teamRedGroups = this.teamBlueGroups.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      }

    });
  }

  fillOfflineCompetitors() {
    this.listToSortGroups.forEach(data => {
      data.forEach(offlineCompetitor => {
        this.offlineCompetitors.push(offlineCompetitor);
      })
    })
  }

  fillOfflineTeams() {
    this.listToSortTeamGroups.forEach(data => {
      data.forEach(offlineTeam => {
        this.offlineTeams.push(offlineTeam);
      })
    })
  }

  shuffleGroups() {
    if (this.isSingle) {
      this.cleanCompetitors();
      this.startSort = true;
      this.groupArray = this.sortService.shuffleGroups(this.listToSortGroups, this.competition.numberOfKatas, this.groupArray);
      this.fillEmptyKataGroups();
      this.blueGroups = this.groupArray.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      this.redGroups = this.groupArray.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      this.randomOrder(this.redGroups);
      this.randomOrder(this.blueGroups);
    } else if(this.isTeam) {
      this.cleanTeams();
      this.startSort = true;
      this.teamGroupArray = this.sortService.shuffleTeamGroups(this.listToSortTeamGroups, this.competition.numberOfKatas, this.teamGroupArray);
      this.fillEmptyKataTeamGroups();
      this.teamBlueGroups = this.teamBlueGroups.filter(group => group.side == 'blue').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      this.teamRedGroups = this.teamBlueGroups.filter(group => group.side == 'red').sort((a, b) => (a.kata > b.kata) ? 1 : -1);
      this.randomTeamOrder(this.teamBlueGroups);
      this.randomTeamOrder(this.teamRedGroups);
    }


  }

  fillEmptyKataGroups() {
    this.groupArray.forEach(group => {
      if ((this.competition.numberOfKatas - 1) == group.kata) {
        for (let i = 1; i <= 8; i++) {
          let offlineCompetitor = new OfflineCompetitor();
          offlineCompetitor.competitor = new Competitor();
          offlineCompetitor.competitor.name = '';
          offlineCompetitor.competitor.lastName = '';
          offlineCompetitor.country = new Country();
          offlineCompetitor.country.name = '';
          group.competitors.push(offlineCompetitor);
        }
      }
    })
  }

  fillEmptyKataTeamGroups() {
    this.teamGroupArray.forEach(group => {
      if ((this.competition.numberOfKatas - 1) == group.kata) {
        for (let i = 1; i <= 8; i++) {
          let offlineTeam = new OfflineTeam();
          offlineTeam.name = '';
          group.teams.push(offlineTeam);
        }
      }
    })
  }

  cleanCompetitors() {
    this.groupArray.forEach(group => {
      group.competitors = new Array();
    });
  }

  cleanTeams() {
    this.teamGroupArray.forEach(group => {
      group.teams = new Array();
    });
  }

  exportPdf() {
    if(this.isSingle) {
      var data = document.getElementById('sortTable');
      this.saveOrderGroups();
    } else if(this.isTeam) {
      var data = document.getElementById('sortTeamTable');
      this.saveTeamOrderGroups();
    }
    html2canvas(data).then(canvas => {
      var imgWidth = 150;
      var pageHeight = 295;
      var imgHeight = 250;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      let pdfName = this.categorieName + '.pdf'
      pdf.save(pdfName);
    });
  }

  randomOrder(group: Array<Group>) {
    group.forEach(group => {
      group.competitors.sort(function () {
        return 0.5 - Math.random()
      })
    });
  }

  randomTeamOrder(teamGroup: Array<TeamGroup>) {
    teamGroup.forEach(group => {
      group.teams.sort(function () {
        return 0.5 - Math.random()
      })
    });
  }

  saveOrderGroups() {
    this.firebaseCompetition.categorie = this.categorieName;
    this.firebaseCompetition.eventId = this.eventId;
    this.groupArray.forEach(group => {
      group.competitors.forEach(competitor => {
        competitor.competitor = (Object.assign({}, competitor.competitor));
        competitor.country = (Object.assign({}, competitor.country));
      });
      const competitors = group.competitors.map((obj) => { return Object.assign({}, obj) });
      group.competitors = competitors;
    })
    const groups = this.groupArray.map((obj) => { return Object.assign({}, obj) });
    this.firebaseCompetition.groups = groups;
    this.firebaseCompetition.numberOfKatas = this.competition.numberOfKatas;
    this.sortService.createCompetition(this.firebaseCompetition);
  }

  saveTeamOrderGroups() {
    this.firebaseTeamCompetition.categorie = this.categorieName;
    this.firebaseTeamCompetition.eventId = this.eventId;
    this.teamGroupArray.forEach(group => {
      const team =  group.teams.map((obj) => { return Object.assign({}, obj) });
      group.teams = team;
    });
    const groups = this.teamGroupArray.map((obj) => { return Object.assign({}, obj) });
    this.firebaseTeamCompetition.groups = groups;
    this.firebaseTeamCompetition.numberOfKatas  = this.competition.numberOfKatas;
    this.sortService.createTeamCompetition(this.firebaseTeamCompetition);
  }

  fillBlueSide(side) {
    let kataNumbers = this.competition.numberOfKatas;
    while (side > 0) {
      let group = this.createGroup(kataNumbers, 'blue');
      this.groupArray.push(group);
      side--;
      kataNumbers--;
    }
  }

  private createGroup(kataNumbers: number, side: string) {
    let group = new Group();
    group.kata = kataNumbers;
    group.side = side;
    return group;
  }

  fillRedSide(side) {
    let kataNumbers = this.competition.numberOfKatas;
    while (side > 0) {
      let group = this.createGroup(kataNumbers, 'red');
      this.groupArray.push(group);
      side--;
      kataNumbers--;
    }
  }

  fillBlueSideTeams(side) {
    let kataNumbers = this.competition.numberOfKatas;
    while (side > 0) {
      let group = this.createTeamGroup(kataNumbers, 'blue');
      this.teamGroupArray.push(group);
      side--;
      kataNumbers--;
    }
  }

  private createTeamGroup(kataNumbers: number, side: string) {
    let group = new TeamGroup();
    group.kata = kataNumbers;
    group.side = side;
    return group;
  }

  fillRedSideTeams(side) {
    let kataNumbers = this.competition.numberOfKatas;
    while (side > 0) {
      let group = this.createTeamGroup(kataNumbers, 'red');
      this.teamGroupArray.push(group);
      side--;
      kataNumbers--;
    }
  }

}
