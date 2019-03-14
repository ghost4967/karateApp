import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings';
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class RadioButtonService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'radioButton';

    getTitle = (): string => 'Radio Button';

    getAllThemes = (): Array<any> => {
        return [
          {"title" : "Simple", "theme"  : "layout1"},
          {"title" : "With avatars", "theme"  : "layout2"},
          {"title" : "Simple 2", "theme"  : "layout3"}
        ];
    };

    getDataForTheme = (menuItem: any): any => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    // Set Data For Radio Button - SIMPLE
    getDataForLayout1 = (): any => {
        return {
            "title" : "Your country",
            "selectedItem": 3,
            "items" : [
              {"id" : 1, "title": "Norway"},
              {"id" : 2, "title": "Ireland"},
              {"id" : 4, "title": "Slovak Republic"},
              {"id" : 3, "title": "Canada"},
              {"id" : 5, "title": "United Kingdom"},
              {"id" : 6, "title": "Philippines"},
              {"id" : 7, "title": "Italy"},
              {"id" : 8, "title": "Brazil"},
              {"id" : 9, "title": "Russian Federation"},
              {"id" : 10, "title": "Mexico"},
              {"id" : 11, "title": "Cyprus"},
              {"id" : 12, "title": "Czech Republic"},
              {"id" : 13, "title": "Austria"}
            ]
          };
    };

    // Set Data For Radio Button - WITH AVATARS
    getDataForLayout2 = (): any => {
        return {
            "title" : "Following",
            "selectedItem": 4,
            "items" : [
              {"id" : 1, "title": "Grant Marshall", "subtitle": "marshall@yahoo.com", "avatar": "assets/images/avatar/0.jpg"},
              {"id" : 2, "title": "Jessica Miles", "subtitle": "miles@mail.com", "avatar": "assets/images/avatar/1.jpg"},
              {"id" : 4, "title": "Natasha Gamble", "subtitle": "gamble@outlook.com", "avatar": "assets/images/avatar/2.jpg"},
              {"id" : 3, "title": "Holman Valencia", "subtitle": "valencia@outlook.com", "avatar": "assets/images/avatar/3.jpg"},
              {"id" : 5, "title": "Prince Phelps", "subtitle": "phelps@gmail.com", "avatar": "assets/images/avatar/4.jpg"},
              {"id" : 6, "title": "Perry Bradley", "subtitle": "bradley@outlook.com", "avatar": "assets/images/avatar/5.jpg"},
              {"id" : 7, "title": "Fitzgerald Stanton", "subtitle": "stanton@mail.com", "avatar": "assets/images/avatar/6.jpg"},
              {"id" : 8, "title": "Byrd Hewitt", "subtitle": "hewitt@outlook.com", "avatar": "assets/images/avatar/7.jpg"},
              {"id" : 9, "title": "Barbara Bernard", "subtitle": "bernard@yahoo.com", "avatar": "assets/images/avatar/8.jpg"},
              {"id" : 10, "title": "Cline Lindsay", "subtitle": "lindsay@gmail.com", "avatar": "assets/images/avatar/9.jpg"}
            ]
          };
    };

    // Set Data For Radio Button - SIMPLE 2
    getDataForLayout3 = (): any => {
        return {
            "title" : "Loctions",
            "selectedItem": 4,
            "items" : [
              {"id" : 1, "title": "Dunbar", "subtitle": "Bangladesh"},
              {"id" : 2, "title": "Motley", "subtitle": "Kuwait"},
              {"id" : 4, "title": "Boonville", "subtitle": "Mexico"},
              {"id" : 3, "title": "Chesapeake", "subtitle": "Netherlands Antilles"},
              {"id" : 5, "title": "Sanders", "subtitle": "Liechtenstein"},
              {"id" : 6, "title": "Bath", "subtitle": "Finland"},
              {"id" : 7, "title": "Holtville", "subtitle": "Greenland"},
              {"id" : 8, "title": "Indio", "subtitle": "Brazi"},
              {"id" : 9, "title": "Cazadero", "subtitle": "United Kingdom"},
              {"id" : 10, "title": "Bridgetown", "subtitle": "Poland"},
              {"id" : 11, "title": "Fowlerville", "subtitle": "Micronesia"},
              {"id" : 12, "title": "Enlow", "subtitle": "Congo"},
              {"id" : 13, "title": "Marne", "subtitle": "Chile"}
            ]
          };
    };

     getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onSelect': function(item: any) {
                  that.toastCtrl.presentToast(item.title);
            },
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
    }

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('radioButton/' + item.theme)
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
    }
}
