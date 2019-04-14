import { Categorie } from './categorie';

export class Competitor {
    id: string;
    name: string;
    lastName: string;
    secondLastName: string;
    gender: string;
    categorie: Categorie;
    age: number;
    eventId: string;
    countryId: string;
}