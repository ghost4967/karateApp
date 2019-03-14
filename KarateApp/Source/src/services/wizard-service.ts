import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class WizardService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'wizard';

    getTitle = (): string => 'Wizard';

    getAllThemes = (): Array<any> => {
        return [
            { "title": "Simple + icon", "theme": "layout1" },
            { "title": "Big image", "theme": "layout2" },
            { "title": "Big Image + Text", "theme": "layout3" }
        ];
    };

    getDataForTheme = (menuItem: any): Array<any> => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    // Set Data For Wizard - SIMPLE + ICON
    getDataForLayout1 = (): any => {
        return {
            "toolBarTitle": "Simple + icon",
            "btnPrev": "Previous",
            "btnNext": "Next",
            "btnFinish": "Finish",
            "items": [
                {
                    "iconSlider": "icon-star-outline",
                    "title": "Fortuitu ad aeroportus",
                    "description": "Morbi lacinia interdum nulla penatibus amet nibh adipiscing semper ligula, tempor sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minima veniam, quis exercitationem ullamco nostrud laboris nisi ut ex ea commodo aliquip consequat.",
                    "buttonNext": "Next"
                },
                {
                    "iconSlider": "icon-star-half",
                    "title": "Communications moderatoris",
                    "description": "Dolor in reprehenderit in duis irure voluptate velit esse fugiat dolore eu nulla pariatur cillum. Non cupidatat excepteur occaecat proident sint, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "buttonNext": "Next",
                    "buttonPrevious": "Previous"
                },
                {
                    "iconSlider": "icon-star",
                    "title": "Hoc est exortum",
                    "description": "Ut enim ad minima veniam, quis exercitationem ullamco nostrud laboris nisi ut ex ea commodo aliquip consequat. Dolor in reprehenderit in duis irure voluptate velit esse fugiat dolore eu nulla pariatur cillum.",
                    "buttonPrevious": "Previous",
                    "buttonFinish": "Finish"

                }
            ]
        };
    };

    // Set Data For Wizard - BIG IMAGE
    getDataForLayout2 = (): any => {
        return {
            "toolBarTitle": "Big image",
            "btnNext": "Next",
            "btnFinish": "Finish",
            "items": [
                {
                    "backgroundImage": "assets/images/avatar-large/1.jpg",
                    "title": "Fortuitu ad aeroportus"
                },
                {
                    "backgroundImage": "assets/images/avatar-large/2.jpg",
                    "title": "Communications moderatoris"
                },
                {
                    "backgroundImage": "assets/images/avatar-large/3.jpg",
                    "title": "Hoc est exortum"
                }
            ]
        };
    };

    // Set Data For Wizard - BIG IMAGE + TEXT
    getDataForLayout3 = (): any => {
        return {
            "btnNext": "Next",
            "btnFinish": "Finish",
            "btnSkip": "Skip",
            "items": [
                {
                    "backgroundImage": "assets/images/avatar-large/5.jpg",
                    "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                    "button": "Next",
                    "skip": "Skip"
                },
                {
                    "backgroundImage": "assets/images/avatar-large/6.jpg",
                    "title": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
                    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "button": "Next",
                    "skip": "Skip"
                },
                {
                    "backgroundImage": "assets/images/avatar-large/7.jpg",
                    "title": "The generated Lorem Ipsum is therefore always free from repetition, injected humour",
                    "description":" Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem",
                    "button": "Finish",
                    "skip": "Skip"
                }
            ]
        };
    };

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onFinish': function (event: any) {
                that.toastCtrl.presentToast("Finish");
            }
        };
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    }

    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: [],
            theme: item.theme,
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
                    .object('wizard/' + item.theme)
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
