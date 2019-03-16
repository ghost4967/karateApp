import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePanelPage } from './create-panel';
import { FormLayout1Module } from '../../components/forms/layout-1/form-layout-1.module';


@NgModule({
  declarations: [
    CreatePanelPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePanelPage),
    FormLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePanelPageModule {}
