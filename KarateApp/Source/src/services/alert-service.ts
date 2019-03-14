 import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class AlertService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'alert';

    getTitle = (): string => 'Alert';

    getAllThemes = (): Array<any> => {
        return [
          {"title" : "Alert Info", "theme"  : "layout1"},
          {"title" : "Alert Warning", "theme"  : "layout2"},
          {"title" : "Alert Subscribe", "theme"  : "layout3"}
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
            onButton: function(item: any) {
                that.toastCtrl.presentToast(item.title);
            }
        };
    };

    getDataForLayout1 = (): any => {
        return {
          "items": [
              {
                  "id": 1,
                  "image": "assets/images/background/4.jpg",
                  "title": "Trichocereus lamprochlorus",
                  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              },
              {
                "id": 2,
                "image": "assets/images/background/8.jpg",
                "title": "Opuntia phaeacantha leaves",
                "description": " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              },
              {
                "id": 3,
                "image": "assets/images/background/7.jpg",
                "title": "Cactus Spines",
                "description": "Many desktop publishing packages and web page editors now use Lorem Ipsum. "
              },
              {
                "id": 4,
                "image": "assets/images/background/6.jpg",
                "title": "Stetsonia coryne with flower",
                "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots."
              },
              {
                "id": 4,
                "image": "assets/images/background/5.jpg",
                "title": "Cactus",
                "description": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks."
              }
          ]
      };
    };

    getDataForLayout2 = (): any => {
        return {
          "items": [
              {
                  "id": 1,
                  "category": "architecture",
                  "image": "assets/images/background/14.jpg",
                  "title": "First World Hotel",
                  "iconLike": "thumbs-up",
                  "iconComment": "ios-chatbubbles",
                  "numberLike": "12",
                  "numberCommnet": "4",
              },
              {
                  "id": 2,
                  "category": "architecture",
                  "image": "assets/images/background/15.jpg",
                  "title": "The Venetian",
                  "iconLike": "thumbs-up",
                  "iconComment": "ios-chatbubbles",
                  "numberLike": "12",
                  "numberCommnet": "4",
              },
              {
                  "id": 3,
                  "category": "architecture",
                  "image": "assets/images/background/23.jpg",
                  "title": "MGM Grand Las Vegas",
                  "iconLike": "thumbs-up",
                  "iconComment": "ios-chatbubbles",
                  "numberLike": "12",
                  "numberCommnet": "4",
              },
              {
                  "id": 4,
                  "category": "architecture",
                  "image": "assets/images/background/21.jpg",
                  "title": "Izmailovo Hotel",
                  "iconLike": "thumbs-up",
                  "iconComment": "ios-chatbubbles",
                  "numberLike": "12",
                  "numberCommnet": "4",
              },
              {
                  "id": 5,
                  "category": "architecture",
                  "image": "assets/images/background/9.jpg",
                  "title": "Encore Las Vegas",
                  "iconLike": "thumbs-up",
                  "iconComment": "ios-chatbubbles",
                  "numberLike": "12",
                  "numberCommnet": "4",
              },
              {
                  "id": 6,
                  "category": "architecture",
                  "image": "assets/images/background/13.jpg",
                  "title": "Flamingo Las Vegas",
                  "iconLike": "thumbs-up",
                  "iconComment": "ios-chatbubbles",
                  "numberLike": "12",
                  "numberCommnet": "4",
              }
          ]
      };
    };

    getDataForLayout3 = (): any => {
      return {
        "items": [
            {
                "id": 1,
                "image": "assets/images/background/17.jpg",
                "time": "MARCH 14, 2017",
                "title": "Swivel chair",
                "description": "You sit comfortably since the chair is adjustable in height.",
                "iconLike": "thumbs-up",
                "iconComment": "ios-chatbubbles",
                "numberLike": "12",
                "numberCommnet": "4",
            },
            {
                "id": 2,
                "image": "assets/images/background/20.jpg",
                "time": "MARCH 14, 2017",
                "title": "Table top",
                "description": "Pre-drilled holes for legs, for easy assembly.",
                "iconLike": "thumbs-up",
                "iconComment": "ios-chatbubbles",
                "numberLike": "12",
                "numberCommnet": "4",
            },
            {
                "id": 3,
                "image": "assets/images/background/15.jpg",
                "time": "MARCH 14, 2017",
                "title": "Office desks",
                "description": "It’s easy to keep your desk neat.",
                "iconLike": "thumbs-up",
                "iconComment": "ios-chatbubbles",
                "numberLike": "12",
                "numberCommnet": "4",
            },
            {
                "id": 4,
                "image": "assets/images/background/23.jpg",
                "time": "MARCH 14, 2017",
                "title": "Computer desks",
                "description": "The legs can be mounted to the right or left.",
                "iconLike": "thumbs-up",
                "iconComment": "ios-chatbubbles",
                "numberLike": "12",
                "numberCommnet": "4",
            },
            {
                "id": 5,
                "image": "assets/images/background/11.jpg",
                "time": "MARCH 14, 2017",
                "title": "Work lamps",
                "description": "The lamp is lightweight and easy to move anywhere.",
                "iconLike": "thumbs-up",
                "iconComment": "ios-chatbubbles",
                "numberLike": "12",
                "numberCommnet": "4",
            },
            {
                "id": 6,
                "image": "assets/images/background/14.jpg",
                "time": "MARCH 14, 2017",
                "title": "Bookcases",
                "description": "A simple unit can be enough storage for a limited space",
                "iconLike": "thumbs-up",
                "iconComment": "ios-chatbubbles",
                "numberLike": "12",
                "numberCommnet": "4",
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
                    .object('alert/' + item.theme)
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
