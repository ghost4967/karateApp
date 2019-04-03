import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingKataPage } from './waiting-kata';

@NgModule({
  declarations: [
    WaitingKataPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingKataPage),
  ],
})
export class WaitingKataPageModule {}
