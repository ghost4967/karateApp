import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartKataPage } from './start-kata';

@NgModule({
  declarations: [
    StartKataPage,
  ],
  imports: [
    IonicPageModule.forChild(StartKataPage),
  ],
})
export class StartKataPageModule {}
