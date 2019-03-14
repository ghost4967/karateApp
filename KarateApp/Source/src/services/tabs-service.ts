import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { LoadingService } from './loading-service'

@Injectable()
export class TabsService implements IService {

  constructor(public af: AngularFireDatabase, private loadingService: LoadingService) { }

  getId = (): string => 'tabs';

  getTitle = (): string => 'Tabs';

  getAllThemes = (): Array<any> => {
    return [
      { "title": "Footer tab - text", "theme": "layout1" },
      { "title": "Footer tab - icons", "theme": "layout2" },
      { "title": "Header tab - text", "theme": "layout3" }
    ];
  };

  getEventsForTheme = (menuItem: any): any => {
    return {};
  };

  getDataForTheme = (menuItem: any): any => {
    return this[
      'getDataFor' +
      menuItem.charAt(0).toUpperCase() +
      menuItem.slice(1)
    ]();
  };

  // Set Data For Tabs - PAGE 1
  getDataForTab1 = (): any => {
    return {
      "backgroundImage" : "assets/images/avatar-large/1.jpg",
      "description" : "Sed satis est ut probe exercuisse. Experiri problems est ut minae ultra solitum, sed re vera non excusat, quia in illis agit pessimus modo fieri potest.",
      "title" : "Census Introduction"
    };
  }

  // Set Data For Tabs - PAGE 2
  getDataForTab2 = (): any => {
    return {
      "backgroundImage" : "assets/images/avatar-large/2.jpg",
      "description" : "In secunda parte, constitue 'est maxime alumni. Qui non scit, cum non communicent cum homine lingua Latina igitur difficultatem se sentire. Et ante facere damnationem mens eorum: tunc loquetur. Haec est secunda pars dicere cum fiducia et sine ope facere periculum faciendi animo sententia.",
      "title" : "Majoribus tuis Census"
    };
  }

  // Set Data For Tabs - PAGE 3
  getDataForTab3 = (): any => {
      return {
        "backgroundImage" : "assets/images/avatar-large/3.jpg",
        "description" : "Tertia Vade est provectae doctrinam. Si primo didicit duas partes, et tertiam partem hæc faciam vobis: scientes quod de Anglis. ",
        "title" : "Vos may reperio scissa est impar, aut damnum"
      };
  }

  // Set Data For Tabs - PAGE 4
  getDataForTab4 = (): any => {
      return {
        "backgroundImage" : "assets/images/avatar-large/4.jpg",
        "description" : "Tibi poterit, de qua fiducia et assistent coadunationibus a-membra loqui linguis difficile. Cras interdum sollicitudin ante facile legitur vasa quibus difficile verba.",
        "title" : "Ordo est ut media Teresiae"
      };
  }

  // Set Data For Tabs - PAGE 5
  getDataForTab5 = (): any => {
    return {
      "backgroundImage" : "assets/images/avatar-large/5.jpg",
      "description" : "In finem, non possumus dicere non debemus quod ab Anglis liber PDF Guru ad alumni. Vos can adepto a liberum web oratio infra per exemplum a visitare. Omnes tres partes in unum zip lima.",
      "title" : "Procurator sine dixeritis visionem"
    };
  }

  // Set Data For Tabs - PAGE 6
  getDataForTab6 = (): any => {
      return {
        "backgroundImage" : "assets/images/avatar-large/6.jpg",
        "description" : "Ut nos omnes scitis quod in Latina lingua est maxime momenti in hoc mundo. Et dicunt ei possumus est internationalis lingua communicationis. Iusta putant vel si patriam loci in quo nunc es, ad iter ad loci linguam intelligere non posset, tum in aliis linguis Latina non solum ut auxilium vobis. Ita magna est nimis discere et intelligunt linguae.",
        "title" : "Carpe occasiones Brexit"
      };
  };

  getShowItemId = (item: any): string => {
    return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
  };

  prepareParams = (item: any) => {
    let result = {
      title: item.title,
      data: [],
      events: this.getEventsForTheme(item)
    };
    result[this.getShowItemId(item)] = true;
    return result;
  };

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    if (AppSettings.IS_FIREBASE_ENABLED) {
        return new Observable(observer => {
            this.af
                .object('tab/' + item)
                .valueChanges()
                .subscribe(snapshot => {
                    that.loadingService.hide();
                    observer.next(snapshot);
                    observer.complete();
                }, err => {
                    that.loadingService.hide();
                    observer.error([]);
                    observer.complete();
                });
        });
    } else {
        return new Observable(observer => {
            that.loadingService.hide();
            observer.next(this.getDataForTheme(item));
            observer.complete();
        });
    }
  };
}
