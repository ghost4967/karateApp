import { Injectable } from '@angular/core';
import { Competition } from '../../models/competition';
import { AngularFirestore } from 'angularfire2/firestore';
import { Competitor } from '../../models/competitor';
import { FirebaseCompetition } from '../../models/firebase-competition';
import { Group } from '../../models/group';

@Injectable({
  providedIn: 'root'
})
export class SortService {


  sideArray = ['blue', 'red'];

  constructor(private storeFirebase: AngularFirestore) { }

  public shuffleGroups(competitorList, numberOfKatas, groupArray) {
    let flag = 'blue';
    competitorList.forEach(offlineCompetitors => {
      let randomIndex = Math.floor(Math.random() * offlineCompetitors.length);
      let data = offlineCompetitors[randomIndex];
      let side = this.sideArray[Math.floor(Math.random() * this.sideArray.length)];
      if (offlineCompetitors.length == 1) {
        let sideToPut = side == flag ? flag : side;
        let groups = groupArray.find(group => group.kata == numberOfKatas && sideToPut == group.side);
        groups.competitors.push(data);
        if (side == flag) {
          flag == this.sideArray.find(side => side != flag)
        }
      } else {
        offlineCompetitors.forEach(competitor => {
          if (data == competitor && groupArray.some(group => !group.competitors.find(competitor => competitor == competitor))) {
            let blueGroup = groupArray.find(group => group.kata == numberOfKatas && group.side == "blue");
            blueGroup.competitors.push(data);
          } else {
            let redGroup = groupArray.find(group => group.kata == numberOfKatas && group.side == "red");
            redGroup.competitors.push(competitor);
          }
        });
      }
    });
    return groupArray;
  }

  public shuffleTeamGroups(teamLists, numberOfKatas, teamGroupArray) {
    let flag = 'blue';
    teamLists.forEach(offlineTeams => {
      let randomIndex = Math.floor(Math.random() * offlineTeams.length);
      let data = offlineTeams[randomIndex];
      let side = this.sideArray[Math.floor(Math.random() * this.sideArray.length)];
      if (offlineTeams.length == 1) {
        let sideToPut = side == flag ? flag : side;
        let teams = teamGroupArray.find(group => group.kata == numberOfKatas && sideToPut == group.side);
        teams.competitors.push(data);
        if (side == flag) {
          flag == this.sideArray.find(side => side != flag)
        }
      } else {
        offlineTeams.forEach(team => {
          if (data == team && teamGroupArray.some(teamGroup => !teamGroup.teams.find(team => team == team))) {
            let blueGroup = teamGroupArray.find(group => group.kata == numberOfKatas && group.side == "blue");
            blueGroup.competitors.push(data);
          } else {
            let redGroup = teamGroupArray.find(group => group.kata == numberOfKatas && group.side == "red");
            redGroup.competitors.push(team);
          }
        });
      }
    });
    return teamGroupArray;

  }

  public buildCompetition(numberOfCompetitors: number) {
    console.log(numberOfCompetitors);
    if (numberOfCompetitors === 2 || numberOfCompetitors === 3) {
      return this.buildCompetitionData(1, 1, numberOfCompetitors);
    } else if (numberOfCompetitors === 4 || (numberOfCompetitors >= 5 && numberOfCompetitors <= 10)) {
      return this.buildCompetitionData(2, 2, numberOfCompetitors);
    } else if (numberOfCompetitors >= 11 && numberOfCompetitors <= 24) {
      return this.buildCompetitionData(2, 3, numberOfCompetitors);
    } else if (numberOfCompetitors >= 25 && numberOfCompetitors <= 48) {
      return this.buildCompetitionData(4, 4, numberOfCompetitors);
    } else if (numberOfCompetitors >= 49 && numberOfCompetitors <= 96) {
      return this.buildCompetitionData(8, 4, numberOfCompetitors);
    } else if (numberOfCompetitors >= 97) {
      return this.buildCompetitionData(16, 5, numberOfCompetitors);
    }
  }

  public getTotalGroups(numberOfKatas: number) {
    switch (numberOfKatas) {
      case 1: return 0;
      case 2: return 2;
      case 3: return 4;
    }
  }

  buildCompetitionData(numberOfGroups: number, numberOfKatas: number, numberOfCompetitors: number) {
    let competition: Competition = new Competition();
    competition.numberOfCompetitors = numberOfCompetitors;
    competition.numberOfGroups = numberOfGroups;
    competition.numberOfKatas = numberOfKatas;
    return competition;
  }

  createCompetition(competition: FirebaseCompetition) {
    return this.storeFirebase.collection('competitions').add(Object.assign({}, competition));
  }
}
