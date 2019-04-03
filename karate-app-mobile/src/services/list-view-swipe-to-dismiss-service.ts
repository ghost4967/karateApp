import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings';
import { ToastService } from './toast-service';
import { LoadingService } from './loading-service';

@Injectable()
export class ListViewSwipeToDismissService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'swipeToDismiss';

    getTitle = (): string => 'Swipe to dismiss';

    getAllThemes = (): Array<any> => {
        return [
            { "title": "Small item + header", "theme": "layout1" },
            { "title": "Products + CTA", "theme": "layout2" },
            { "title": "Full with image", "theme": "layout3" }
        ];
    };

    getDataForTheme = (menuItem: any): Array<any> => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    // Set Data For Swipe To Dismiss - SMALL ITEM + HEADER
    getDataForLayout1 = (): any => {
        return {
            "title": "HeaderTitle",
            "description": "HeaderSubtitle",
            "shortDescription": "35:72",
            "iconLike": "icon-thumb-up",
            "iconFavorite": "icon-heart",
            "iconShare": "icon-share-variant",
            "iconPlay": "icon-play-circle-outline",
            "items": [
                {
                    "id": 1,
                    "title": "Song Of Souls",
                    "description": "Shawna Norman",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/0.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 2,
                    "title": "Tune Of My Obsessions",
                    "description": "Janice Wilder",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/1.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 3,
                    "title": "Reject Her Tomorrow",
                    "description": "Lucy Bender",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/2.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 4,
                    "title": "Troubles Of My Blues",
                    "description": "ouglas Burks",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/3.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 5,
                    "title": "Broken Tonight",
                    "description": "Sophia Cochran",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/4.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 6,
                    "title": "Sure Choices",
                    "description": "Lara Lynn",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/5.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 7,
                    "title": "A Storm Is Coming",
                    "description": "Juliette Medina",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/6.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 8,
                    "title": "He Heard He's Crazy",
                    "description": "Vanessa Ryan",
                    "shortDescription": "3:42",
                    "image": "assets/images/avatar/7.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                }
            ]
        };
    };

    // Set Data For Swipe To Dismiss - PRODUCT + CTA
    getDataForLayout2 = (): any => {
        return {
            "items": [
                {
                    "id": 1,
                    "title": "Black Shirt",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/17.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 2,
                    "title": "Black Sweater",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/18.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 3,
                    "title": "Shirt",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/19.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 4,
                    "title": "White Shirt",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/20.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 5,
                    "title": "White T shirt",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/21.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 6,
                    "title": "T shirt",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/22.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 7,
                    "title": "Hoodies",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/23.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 8,
                    "title": "Sweater",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/17.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 9,
                    "title": "White Sweater",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "image": "assets/images/avatar/18.jpg",
                    "oldPrice": "$42.99",
                    "newPrice": "$35.99",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                }
            ]
        };
    };

    // Set Data For Swipe To Dismiss - FULL WITH IMAGE 
    getDataForLayout3 = (): any => {
        return {
            "items": [
                {
                    "id": 1,
                    "title": "Weedville",
                    "description": "Northern Mariana Islands",
                    "image": "assets/images/background-small/7.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 2,
                    "title": "Curtice",
                    "description": "Nauru",
                    "image": "assets/images/background-small/9.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 3,
                    "title": "Norvelt",
                    "description": "Indonesia",
                    "image": "assets/images/background-small/10.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 4,
                    "title": "Vincent",
                    "description": "Antarctica",
                    "image": "assets/images/background-small/11.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 5,
                    "title": "Fairacres",
                    "description": "Colombia",
                    "image": "assets/images/background-small/12.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 6,
                    "title": "Greenwich",
                    "description": "Tajikistan",
                    "image": "assets/images/background-small/13.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 7,
                    "title": "Ryderwood",
                    "description": "Sao Tome and Principe",
                    "image": "assets/images/background-small/9.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                },
                {
                    "id": 8,
                    "title": "Lithium",
                    "description": "Puerto Rico",
                    "image": "assets/images/background-small/15.jpg",
                    "iconDelate": "icon-delete",
                    "iconUndo": "icon-undo-variant"
                }
            ]
        }
    };

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onItemClick': function (item: any) {
                  that.toastCtrl.presentToast(item);
            },
            'onLike': function (item: any) {
                  that.toastCtrl.presentToast("Like");
            },
            'onFavorite': function (item: any) {
                  that.toastCtrl.presentToast("Favorite");
            },
            'onShare': function (item: any) {
                  that.toastCtrl.presentToast("Share");
            },
            'onFab': function (item: any) {
                  that.toastCtrl.presentToast("Fab");
            },
        };
    };

    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: {},
            theme: item.theme,
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
                    .object('listView/swipeToDismiss/' + item.theme)
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
