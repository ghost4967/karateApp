import { Categorie } from './categorie';

export class Competitor {
    id: string;
    name: string;
    lastName: string;
    secondLastName: string;
    gender: string;
    categorie?: Categorie;
    birthDate: Date;
    ci: number;
    eventId: string;
    countryId: string;
}