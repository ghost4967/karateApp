import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JudgeGradeListPage } from './judge-grade-list';

@NgModule({
  declarations: [
    JudgeGradeListPage,
  ],
  imports: [
    IonicPageModule.forChild(JudgeGradeListPage),
  ],
})
export class JudgeGradeListPageModule {}
