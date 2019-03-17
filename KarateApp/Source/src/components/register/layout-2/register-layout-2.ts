import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { KarateService } from '../../../services/karate.service';

@IonicPage()
@Component({
    selector: 'register-layout-2',
    templateUrl: 'register.html'
})
export class RegisterLayout2 {

    @Input() data: any;
    @Input() events: any;

    public username: string;
    public sesionCode: string;
    public country: string;
    public city: string;
    public email: string;

    private isEmailValid: boolean = true;
    private isUsernameValid: boolean = true;
    private isPasswordValid: boolean = true;
    private isCityValid: boolean = true;
    private isCountryValid: boolean = true;
    
    private regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private karateService: KarateService) { }

    onEvent = (event: string): void => {
        if (event == "onRegister" && !this.validate()) {
            return;
        }
        if (this.events[event]) {
            this.events[event](
            );
        }
    }

    validate():boolean {
        this.isEmailValid = true;
        this.isUsernameValid = true;
        this.isPasswordValid = true;
        this.isCityValid = true;
        this.isCountryValid = true;

        if (!this.username ||this.username.length == 0) {
            this.isUsernameValid = false;
        }
    
        if (!this.sesionCode || this.sesionCode.length == 0) {
            this.isPasswordValid = false;
        }

        if (!this.sesionCode || this.sesionCode.length == 0) {
            this.isPasswordValid = false;
        }

        if (!this.city || this.city.length == 0) {
            this.isCityValid = false;
        }

        if (!this.country || this.country.length == 0) {
            this.isCountryValid = false;
        }

        this.isEmailValid = this.regex.test(this.email);
        
        return this.isEmailValid && 
            this.isPasswordValid && 
            this.isUsernameValid && 
            this.isCityValid && 
            this.isCountryValid;
    }
    
}
