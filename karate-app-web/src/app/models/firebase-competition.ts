import { Final } from './final';
import { Group } from './group';

export class FirebaseCompetition {
    id: string;
    eventId: string;
    categorie: string;
    groups: Array<Group>;
    numberOfKatas: number;
}