import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class ActionSheetService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'actionSheet';

    getTitle = (): string => 'Action Sheet';

    getAllThemes = (): Array<any> => {
        return [
            { "title": "Basic", "theme": "layout1" },
            { "title": "News", "theme": "layout2" },
            { "title": "With Text Header", "theme": "layout3" }
        ];
    };

    getDataForTheme = (menuItem: any): any => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    // Set Data For Action Sheet - BASIC
    getDataForLayout1 = (): any => {
        return {
            "headerTitle": "Basic",
            "headerImage": "assets/images/background/26.jpg",
            "shareIcon": "ios-more",
            "actionSheet": {
                "buttons": [
                    {
                        "text": "Add to Cart",
                        "role": "destructive"
                    },
                    {
                        "text": "Add to Favorites"
                    },
                    {
                        "text": "Read more info"
                    },
                    {
                        "text": "Delete Item"
                    },
                    {
                        "text": "Cancel",
                        "role": "cancel"
                    }
                ]
            },
            "items": [
                {
                    "id": 1,
                    "title": "dixisse isaac",
                    "subtitle": "subtilissima illud",
                    "category": "nOVUM LUDUM",
                    "button": "$14.99",
                    "description": "Comparari cum technicitate progreditur priorem quae habebat effectum in intimo ac numquam perituro & commercii societatis et socialis instrumentis, est unice delectabat, tanto celeritas adoptionis filiorum, in vitae usum deducitur.",
                    "productDescriptions": [
                        {
                            "id": 1,
                            "description": "Invenimus quod de proelio et user mos significant generatae socialis contentus in locis coniciunt in sui civitas active versantur in progressionem in products et servicia et recensionem. Notam ostendere ab advocatis de interest in in occupatus timendus fuerit productum vel servitium quam consummatio, et usus eius et co-progressionem hanc occasionem praebet ad eos, et per facultatem publice agnita quod aliqualiter pro conlatione."
                        },
                        {
                            "id": 2,
                            "description": "Labore et dolore eu consequat cupidatat commodo met enim sit ipsum ut sint duis minim. Sint aliqua pariatur duis Xercitation est ad ut. Sancti minim deserunt laborum voluptate velit esse ipsum veniam deserunt veniam proident sint non exercitationem."
                        },
                        {
                            "id": 3,
                            "description": "Lectionum ac recentius in desktop software quasi operturus Jeep libellorum ex eros etiam accumsan. Non remansit quinque saecula non tantum, sed etiam in saltu electronic condimentum, remanserant per se unum. Is eram in 1960 popularized cum remissionis de Letraset Folia accumsan."
                        },
                        {
                            "id": 4,
                            "description": "Lectionum ac recentius in desktop software quasi operturus Jeep libellorum ex eros etiam accumsan. Non remansit quinque saecula non tantum, sed etiam in saltu electronic condimentum, remanserant per se unum. Is eram in 1960 popularized cum remissionis de Letraset Folia accumsan."
                        }
                    ]
                }
            ]
        }
    };

    // Set Data For Action Sheet - NEWS
    getDataForLayout2 = (): any => {
        return {
            "headerTitle": "News",
            "headerImage": "assets/images/background/23.jpg",
            "title": "Infinit pontem in Sinis. Quod locus non videre finem pontis. VII deambulatio inter homines pereunt.",
            "subtitle": "per marescalluml",
            "category": "certe",
            "avatar": "assets/images/avatar/3.jpg",
            "shareIcon": "ios-more",
            "actionSheet": {
                "buttons": [
                    {
                        "text": "Add to Cart",
                        "role": "destructive"
                    },
                    {
                        "text": "Add to Favorites"
                    },
                    {
                        "text": "Read more info"
                    },
                    {
                        "text": "Delete Item"
                    },
                    {
                        "text": "Cancel",
                        "role": "cancel"
                    }
                ]
            },
            "items": [
                {
                    "id": 1,
                    "subtitle": "Hoc est, visu nova thriller, posuit orbem in fimbriis modern arte, quae est tenebrosa, haunting, torta - vertit se et in suo modo. Non quod objective, et arte discipulus apud Notingham, nuper Jack quae ducitur 'diluvium,' frigus, saeva enfant inexpugnabiles omnes modern art. Et vadit ad deversorium cubiculum vult bibere et cetera id exuendum statum tunc illa e somno evigilans in lecto suo."
                },
                {
                    "id": 2,
                    "subtitle": "Percussas pavore est, sane, sed etiam in auribus eorum amplius diluvium ad inveniendum, qui utitur maxime auctoribus imaginum cinematographicarum praebere video camera ejus vita (hoc est ars, ut videtur). Et obliti sunt ea nocte in hotel cubiculum terminus sursum in quodam loco quis gallery? Si illa ad magistratus? Et factum est, ut quod deest illi amice Jenny?"
                },
                {
                    "id": 3,
                    "subtitle": "It takes sursum magis, nimis longum est aedificate (usque ad paginam fere CLX) Ad validam in mia quia actio, sed altiore hoc est a dolor modern thriller, et fortiter mentis habitu femineo (adhuc inusitato scelus ficta). Jaq Hazell vigilare sit an author."
                },
                {
                    "id": 4,
                    "subtitle": "Vesalius habet cum ramosis in lupinotuum, conscripserit et comici librorum, sed saeva Lane videt eum quasi animam suam antiquis nota mundo, quamvis tempus suum ingenia sunt paulo plus crevit et hi qui crediderant, cum ex Novus York ad urbem est viridius, affluentes, et suburbana earum."
                }
            ]
        };
    };

    // Set Data For Action Sheet - WITH TEXT HEADER
    getDataForLayout3 = (): any => {
        return {
            "headerTitle": "With Text Header",
            "shareIcon": "ios-more",
            "actionSheet": {
                "title": "Choose what to do with this card?",
                "buttons": [
                    {
                        "text": "Read more",
                        "role": "destructive"
                    },
                    {
                        "text": "Add to Favorites"
                    },
                    {
                        "text": "Delete Card"
                    },
                    {
                        "text": "Disable Card"
                    },
                    {
                        "text": "Cancel",
                        "role": "cancel"
                    }
                ]
            },
            "items": [
                {
                    "id": 1,
                    "category": "offer optimus",
                    "image": "assets/images/background/2.jpg",
                    "title": "Aliquam Liberum Ride",
                    "subtitle": "Dunbar, Bangladesh",
                    "button": "$35.99"
                },
                {
                    "id": 2,
                    "category": "res pelagus",
                    "image": "assets/images/background/1.jpg",
                    "title": "De Aeris Aperta",
                    "subtitle": "Harold, Spain",
                    "button": "$12.99"
                },
                {
                    "id": 3,
                    "category": "optimus unius tortae",
                    "image": "assets/images/background/0.jpg",
                    "title": "Mare turtures",
                    "subtitle": "Hilltop, France",
                    "button": "$13.45"
                },
                {
                    "id": 4,
                    "category": "Mons",
                    "image": "assets/images/background/3.jpg",
                    "title": "Mons Trout",
                    "subtitle": "Boonville, Mexico",
                    "button": "$38.60"
                },
                {
                    "id": 5,
                    "category": "Aliquam Pontem",
                    "image": "assets/images/background/4.jpg",
                    "title": "Aliquam Pontem",
                    "subtitle": "Bath, Finland",
                    "button": "$40.85"
                },
                {
                    "id": 6,
                    "category": "certe optimus",
                    "image": "assets/images/background/5.jpg",
                    "title": "Scaena Eventus Pelagus",
                    "subtitle": "Cazadero, United Kingdom",
                    "button": "$56.55"
                }
            ]
        };
    }

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onItemClick': function (item: any) {
                that.toastCtrl.presentToast(item.title);
            },
            'onItemClickActionSheet': function (item: any) {
                that.toastCtrl.presentToast(item.button.text);
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
                    .object('actionSheet/' + item.theme)
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
