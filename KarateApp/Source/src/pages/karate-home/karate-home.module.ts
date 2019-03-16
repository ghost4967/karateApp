import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KarateHomePage } from './karate-home';

@NgModule({
  declarations: [
    KarateHomePage,
  ],
  imports: [
    IonicPageModule.forChild(KarateHomePage),
  ],
})
export class KarateHomePageModule {}
