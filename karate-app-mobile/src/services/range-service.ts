import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { LoadingService } from './loading-service'

@Injectable()
export class RangeService implements IService {

  constructor(public af: AngularFireDatabase, private loadingService: LoadingService) { }

  getId = (): string => 'range';

  getTitle = (): string => 'Range';

  getAllThemes = (): Array<any> => {
    return [
      { "title": "All", "theme": "layout1" },
    ];
  };

  // Set Data For Range Services
  getDataForTheme = (menuItem: any): any => {
    return {
      // Set Data For Range Services - BASIC
      "layout1": {
        "title": "BASIC",
        "value": 10
      },

      // Set Data For Range Services - WITH ICONS
      "layout2": {
        "title": "WITH ICONS",
        "iconLeft": "volume-mute",
        "iconRight": "volume-up",
        "min": "-200",
        "max": "200",
        "value": 0
      },

      // Set Data For Range Services - WITH PREDEFINED STEPS
      "layout3": {
        "textLeft": "A",
        "textRight": "A",
        "title": "WITH PREDEFINED STEPS",
        "min": "1000",
        "max": "2000",
        "step": "100",
        "value": 20
      },

      // Set Data For Range Services - TWO SLIDERS
      "layout4": {
        "title": "TWO SLIDERS",
        "min": "1",
        "max": "100",
        "step": "10",
        "value": {
          "lower": 20,
          "upper": 70
        },
        "textLeft": "1",
        "textRight": "10"
      }
    };
  };

  getEventsForTheme = (menuItem: any): any => {
    return {
      'onChange': function (item: any) {}
    };
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

  getShowItemId = (item: any): string => {
    return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
  };

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    if (AppSettings.IS_FIREBASE_ENABLED) {
      return new Observable(observer => {
        this.af
          .object('ranges')
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
