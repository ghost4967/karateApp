import { Competitor } from './competitor';
import { OfflineCompetitor } from './offline-competitor';

export class Group {
    competitors: Array<OfflineCompetitor> = new Array();
    kata: number;
    side: string;
    isGraded: boolean;
}