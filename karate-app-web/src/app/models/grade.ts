import { OfflineCompetitor } from './offline-competitor';
import { Categorie } from './categorie';

export class Grade {
    id: string;
    competitor: OfflineCompetitor;
    eventId: string;
    kata: number;
    categorie: Categorie
}