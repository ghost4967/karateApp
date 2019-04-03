import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class TimeLineService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'timeline';

    getTitle = (): string => 'Time Line';

    getAllThemes = (): Array<any> => {
        return [
          {"title" : "Timeline With Cards", "theme"  : "layout1"},
          {"title" : "Timeline With Avatar", "theme"  : "layout2"},
          {"title" : "Timeline With Comments", "theme"  : "layout3"},
        ];
    };

    getDataForTheme = (menuItem: any): any => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            "onItemClick": function(item: any) {
                that.toastCtrl.presentToast(item.title);
            }
        };
    };

    getDataForLayout1 = (): any => {
        return {
          "items": [
              {
                  "id": 1,
                  "title": "Easy Carrot Cake",
                  "time": "TODAY AT 2:20PM",
                  "image": "assets/images/background/1.jpg"
              },
              {
                  "id": 2,
                  "title": "Lake Ladoga",
                  "time": "TODAY AT 1:30PM",
                  "image": "assets/images/background/2.jpg"
              },
              {
                  "id": 3,
                  "title": "Vasco da Gama Bridge",
                  "time": "TODAY AT 14:20PM",
                  "image": "assets/images/background/3.jpg"
              },
              {
                  "id": 4,
                  "title": "Cactus Flowers",
                  "time": "TODAY AT 15:15PM",
                  "image": "assets/images/background/4.jpg"
              }
          ]
      };
    };

    getDataForLayout2 = (): any => {
        return {
          "items": [
              {
                  "id": 1,
                  "title": "Cake Coklat",
                  "time": "TODAY AT 2:20PM",
                  "avatar": "assets/images/background/1.jpg"
              },
              {
                  "id": 2,
                  "title": "Trichocereus terscheckii",
                  "time": "TODAY AT 1:30PM",
                  "avatar": "assets/images/background/8.jpg"
              },
              {
                  "id": 3,
                  "title": "Vasco da Gama Bridge",
                  "time": "TODAY AT 14:20PM",
                  "avatar": "assets/images/background/3.jpg"
              },
              {
                  "id": 4,
                  "title": "Cactus Spines",
                  "time": "TODAY AT 15:15PM",
                  "avatar": "assets/images/background/4.jpg"
              },
              {
                  "id": 5,
                  "title": "Stetsonia coryne with flower",
                  "time": "TODAY AT 15:15PM",
                  "avatar": "assets/images/background/5.jpg"
              },
              {
                  "id": 6,
                  "title": "Opuntia phaeacantha leaves",
                  "time": "TODAY AT 18:15PM",
                  "avatar": "assets/images/background/6.jpg"
              },
              {
                  "id": 7,
                  "title": "Trichocereus lamprochlorus",
                  "time": "TODAY AT 19:55PM",
                  "avatar": "assets/images/background/7.jpg"
              }
          ]
      };
    };

    getDataForLayout3 = (): any => {
        return {
          "items": [
              {
                  "id": 1,
                  "time": "TODAY AT 2:20PM",
                  "avatar": "assets/images/avatar/10.jpg",
                  "title": "Theresa Mason",
                  "subtitle": "@theresa",
                  "description": "The ambience is great and the food is delicious. Awesome place. Some pictures from our dinner."
              },
              {
                  "id": 2,
                  "time": "TODAY AT 1:30PM",
                  "avatar": "assets/images/avatar/11.jpg",
                  "title": "Ray Clarke",
                  "subtitle": "@ray",
                  "description": "The ambience is great and the food is delicious. Awesome place. Some pictures from our dinner."
              },
              {
                  "id": 3,
                  "time": "TODAY AT 14:20PM",
                  "avatar": "assets/images/avatar/12.jpg",
                  "title": "Caitlin Wilkinson",
                  "subtitle": "@caitlin",
                  "description": "The ambience is great and the food is delicious. Awesome place. Some pictures from our dinner."
              },
              {
                  "id": 4,
                  "time": "TODAY AT 14:20PM",
                  "avatar": "assets/images/avatar/13.jpg",
                  "title": "Fiona Edwards",
                  "subtitle": "@fiona",
                  "description": "The ambience is great and the food is delicious. Awesome place. Some pictures from our dinner."
              }
          ]
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
                    .object('timeline/' + item.theme)
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
