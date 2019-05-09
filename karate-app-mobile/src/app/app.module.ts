import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppSettings } from '../services/app-settings'
import { ToastService } from '../services/toast-service'
import { LoadingService } from '../services/loading-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { KarateService } from '../services/karate.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
@NgModule({
    declarations: [MyApp],
    providers: [
        StatusBar, SplashScreen, BarcodeScanner, Camera,
        ToastService, LoadingService, WheelSelector,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        KarateService
    ],
    imports: [ 
    FormsModule, 
    MbscModule,
        BrowserModule,
        HttpModule, HttpClientModule,
        AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG),
        AngularFireDatabaseModule, AngularFireAuthModule,
        AngularFirestoreModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
