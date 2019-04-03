import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KarateGradePage } from './karate-grade';

@NgModule({
  declarations: [
    KarateGradePage,
  ],
  imports: [
    IonicPageModule.forChild(KarateGradePage),
  ],
})
export class KarateGradePageModule {}
