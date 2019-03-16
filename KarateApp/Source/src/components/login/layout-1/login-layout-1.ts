import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'login-layout-1',
    templateUrl: 'login.html'
})
export class LoginLayout1 {
  @Input() data: any;
  @Input() events: any;

  public password: string;

  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;

  constructor() {}

  onEvent = (event: string): void => {
    if (event == "onLogin" && !this.validate()) {
        return ;
    }
    if (this.events[event]) {
        this.events[event]({
            'password' : this.password
        });
    }
  }

  validate():boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;

    if (!this.password || this.password.length == 0) {
        this.isPasswordValid = false;
    }
    
    return this.isPasswordValid && this.isUsernameValid;
 }
}
