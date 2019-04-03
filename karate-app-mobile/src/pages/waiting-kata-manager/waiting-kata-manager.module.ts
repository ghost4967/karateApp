import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingKataManagerPage } from './waiting-kata-manager';

@NgModule({
  declarations: [
    WaitingKataManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingKataManagerPage),
  ],
})
export class WaitingKataManagerPageModule {}
