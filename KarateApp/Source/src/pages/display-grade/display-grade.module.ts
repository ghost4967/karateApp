import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayGradePage } from './display-grade';

@NgModule({
  declarations: [
    DisplayGradePage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayGradePage),
  ],
})
export class DisplayGradePageModule {}
