import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event-service/event.service';
import { FirebaseCompetition } from '../../../models/firebase-competition';
import { CompetitionService } from '../../../services/competition-service/competition-service';
import { Group } from '../../../models/group';

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
        categorie.isReadyToFinal = this.checkKataOfCategorie(categorie.name);
      })
    });
  }

  checkKataOfCategorie(categorie) {
    let competition = this.competitions.find(competition => competition.categorie == categorie);
    if (competition == undefined) {
      return false;
    }
    let semifinalKata = 2;
    let isBlueSideReady = competition.groups.some(group => group.kata == semifinalKata && group.competitors.every(competitor => competitor['grade']) && group.side == 'blue');
    let isRedSideReady = competition.groups.some(group => group.kata == semifinalKata && group.competitors.every(competitor => competitor['grade']) && group.side == 'red');
    return isBlueSideReady && isRedSideReady;
  }

  buildFinalGroups(categorie) {
    let competition = this.competitions.find(competition => competition.categorie == categorie);
  
    let blueSideCompetitors = competition.groups.find(group => group.kata == 2 && group.side == 'blue').competitors;
    let redSideCompetitors = competition.groups.find(group => group.kata ==2 && group.side == 'red').competitors;

    blueSideCompetitors = blueSideCompetitors.sort((c1,c2) => c2['grade'] - c1['grade']);
    redSideCompetitors = redSideCompetitors.sort((c1,c2) => c2['grade'] - c1['grade']);
    
    let finalGroup = new Group();
    finalGroup.competitors.push(blueSideCompetitors[0]);
    finalGroup.competitors.push(redSideCompetitors[0]);
    finalGroup.kata = 1;
    finalGroup.side = 'final'
    let bronzeGroup = new Group();
    bronzeGroup.competitors.push(blueSideCompetitors[1]);
    bronzeGroup.competitors.push(redSideCompetitors[2]);
    bronzeGroup.kata = 1;
    bronzeGroup.side = 'bronze';
    let secondBronze = new Group();
    secondBronze.competitors.push(blueSideCompetitors[2]);
    secondBronze.competitors.push(redSideCompetitors[1]);
    secondBronze.kata = 1;
    secondBronze.side = 'bronze2';
    
    competition.groups.push((Object.assign({}, finalGroup)));
    competition.groups.push((Object.assign({}, bronzeGroup)));
    competition.groups.push((Object.assign({}, secondBronze)));

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
