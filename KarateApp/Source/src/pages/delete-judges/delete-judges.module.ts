import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteJudgesPage } from './delete-judges';

@NgModule({
  declarations: [
    DeleteJudgesPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteJudgesPage),
  ],
})
export class DeleteJudgesPageModule {}
