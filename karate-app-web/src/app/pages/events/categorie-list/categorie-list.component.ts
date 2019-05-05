import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event-service/event.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { Group } from '../../../models/group';
import { OfflineCompetitor } from '../../../models/offline-competitor';
import { Competitor } from '../../../models/competitor';
import { Country } from '../../../models/country';

@Component({
  selector: 'ngx-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  event: Event = new Event();
  eventId: string;
  isCompetition;
  competitions: FirebaseCompetition[];

  constructor(private route: ActivatedRoute, private eventService: EventService, private competitionService: CompetitionService) {
    this.eventId = route.snapshot.paramMap.get('eventId');
    this.isCompetition = this.route.snapshot.queryParamMap.get("competition");
    if (this.isCompetition == null) {
      this.isCompetition = false;
    }

  }

  ngOnInit() {
    this.eventService.getEventById(this.eventId).subscribe(data => {
      this.event = {
        id: data.payload.id,
        ...data.payload.data()
      } as Event;
    });
    this.competitionService.getByEvent(this.eventId).subscribe(data => {
      this.competitions = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as FirebaseCompetition;
      });
      this.event.categories.forEach(categorie => {
        categorie.isReadyToFinal = this.isReadyToFinal(categorie.name);
      })
    });
  }

  isReadyToFinal(categorie) {
    let competition = this.competitions.find(competition => competition.categorie == categorie);
    let groups = competition != undefined ? competition.groups.filter(group => group.kata != 1) : [];
    return competition != undefined ? groups.every(group =>  group.isGraded) : false;
  }

  buildFinalGroups(categorie) {
    let competition = this.competitions.find(competition => competition.categorie == categorie);

    let blueSideCompetitors = competition.groups.find(group => group.kata == 2 && group.side == 'blue').competitors;
    let redSideCompetitors = competition.groups.find(group => group.kata == 2 && group.side == 'red').competitors;

    blueSideCompetitors = blueSideCompetitors.sort((c1, c2) => c2['grade'] - c1['grade']);
    redSideCompetitors = redSideCompetitors.sort((c1, c2) => c2['grade'] - c1['grade']);

    let finalGroup = new Group();
    finalGroup.competitors.push(blueSideCompetitors[0]);
    finalGroup.competitors.push(redSideCompetitors[0]);
    finalGroup.kata = 1;
    finalGroup.side = 'final';
    let offlineCompetitor = new OfflineCompetitor();
    offlineCompetitor.competitor = (Object.assign({}, new Competitor()));
    offlineCompetitor.competitor.name = '';
    offlineCompetitor.competitor.lastName = '';
    offlineCompetitor.country = (Object.assign({}, new Country()));
    offlineCompetitor.country.name = '';
    let bronzeGroup = new Group();
    bronzeGroup.competitors.push(blueSideCompetitors[1] != undefined ? blueSideCompetitors[1] : (Object.assign({}, offlineCompetitor)));
    bronzeGroup.competitors.push(redSideCompetitors[2] != undefined ? redSideCompetitors[2] : (Object.assign({}, offlineCompetitor)));
    bronzeGroup.kata = 1;
    bronzeGroup.side = 'bronze';
    let secondBronze = new Group();
    secondBronze.competitors.push(blueSideCompetitors[2] != undefined ? blueSideCompetitors[2] : (Object.assign({}, offlineCompetitor)));
    secondBronze.competitors.push(redSideCompetitors[1] != undefined ? redSideCompetitors[1] : (Object.assign({}, offlineCompetitor)));
    secondBronze.kata = 1;
    secondBronze.side = 'bronze2';
    finalGroup.competitors.forEach(competitor => {
      delete competitor['grade'];
      delete competitor['qualified'];
      delete competitor['isGradePresent']
    });
    bronzeGroup.competitors.forEach(competitor => {
      delete competitor['grade'];
      delete competitor['qualified'];
      delete competitor['isGradePresent']
    });
    secondBronze.competitors.forEach(competitor => {
      delete competitor['grade'];
      delete competitor['qualified'];
      delete competitor['isGradePresent']
    });
    if(!competition.groups.some(group => group.side == "final")) {
      competition.groups.push((Object.assign({}, finalGroup)));
    }
    if(!competition.groups.some(group => group.side == "bronze")) {
      competition.groups.push((Object.assign({}, bronzeGroup)));
    }
    if(!competition.groups.some(group => group.side == "bronze2")) {
      competition.groups.push((Object.assign({}, secondBronze)));
    }
    
    finalGroup = this.prepareArray(finalGroup);
    bronzeGroup = this.prepareArray(bronzeGroup);
    secondBronze = this.prepareArray(secondBronze);
    competition.numberOfKatas = 1;

    this.competitionService.updateCompetitionById(competition);

  }

  prepareArray(group) {
    group.competitors.forEach(competitor => {
      competitor = (Object.assign({}, competitor));
    });
    const competitors = group.competitors.map((obj) => { return Object.assign({}, obj) });
    group.competitors = competitors;
    return group;
  }



}
