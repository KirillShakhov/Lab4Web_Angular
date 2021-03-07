import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from '@angular/forms';
import {UrlPermission} from '../services/url-permission/url-permission.service';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';



@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,

        InputTextModule,
        ButtonModule,
        RippleModule
    ],
    providers: [UrlPermission],
    declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {

}
