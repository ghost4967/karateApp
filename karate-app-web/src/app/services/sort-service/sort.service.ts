import { Injectable } from '@angular/core';
import { Competition } from '../../models/competition';
import { AngularFirestore } from 'angularfire2/firestore';
import { Competitor } from '../../models/competitor';
import { FirebaseCompetition } from '../../models/firebase-competition';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor(private storeFirebase: AngularFirestore) { }


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
    switch(numberOfKatas) {
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
