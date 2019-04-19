import { Competitor } from './competitor';
import { Categorie } from './categorie';

export class Team {
    id: string;
    name: string;
    competitors: Array<Competitor> = new Array();
    categorie: Categorie;
    countryId: string;
    eventId: string;
}