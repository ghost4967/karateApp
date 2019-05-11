import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpectatorViewPage } from './spectator-view';

@NgModule({
  declarations: [
    SpectatorViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SpectatorViewPage),
  ],
})
export class SpectatorViewPageModule {}
