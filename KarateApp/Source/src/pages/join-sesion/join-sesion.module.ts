import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinSesionPage } from './join-sesion';
import { RegisterLayout2 } from '../../components/register/layout-2/register-layout-2';
import { RegisterLayout2Module } from '../../components/register/layout-2/register-layout-2.module';

@NgModule({
  declarations: [
    JoinSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinSesionPage),
    RegisterLayout2Module

  ],
})
export class JoinSesionPageModule {}
