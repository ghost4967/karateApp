import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KarateLoginPage } from './karate-login';
import { LoginLayout1Module } from '../../components/login/layout-1/login-layout-1.module';

@NgModule({
  declarations: [
    KarateLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(KarateLoginPage),
    LoginLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KarateLoginPageModule {}
