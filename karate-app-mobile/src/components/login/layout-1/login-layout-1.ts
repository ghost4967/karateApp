import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { KarateService } from '../../../services/karate.service';

@IonicPage()
@Component({
    selector: 'login-layout-1',
    templateUrl: 'login.html',
    providers: [KarateService]
})
export class LoginLayout1 {
  @Input() data: any;
  @Input() events: any;

  public password: string;

  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;

  constructor(private karateService: KarateService) {}

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
    this.karateService.getPassword().subscribe(data => {
        if (this.password !== data) {
          this.isPasswordValid = false;
        }
      })
    
    return this.isPasswordValid;
 }
}
