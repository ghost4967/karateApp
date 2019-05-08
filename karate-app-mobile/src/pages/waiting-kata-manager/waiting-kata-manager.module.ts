import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingKataManagerPage } from './waiting-kata-manager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [
    WaitingKataManagerPage,
  ],
  imports: [ 
    MbscModule,
    IonicPageModule.forChild(WaitingKataManagerPage),
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
})
export class WaitingKataManagerPageModule {}
