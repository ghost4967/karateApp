import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingCompetitorPage } from './waiting-competitor';

@NgModule({
  declarations: [
    WaitingCompetitorPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingCompetitorPage),
  ],
})
export class WaitingCompetitorPageModule {}
