import { Competitor } from './competitor';
import { Country } from './country';

export class OfflineTeam {
    competitors: Array<Competitor> = new Array();
    country: Country;
    name: string;
}