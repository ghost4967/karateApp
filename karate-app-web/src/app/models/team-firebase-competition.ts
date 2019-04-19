import { TeamGroup } from './team-group';

export class TeamFirebaseCompetition {
    eventId: string;
    categorie: string;
    groups: Array<TeamGroup>;
    numberOfKatas: number;
}