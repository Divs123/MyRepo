import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { routing }       from './public-pages.routes';
import { PublicPages } from './public-pages.component';
// import { AppTranslationModule } from '../app.translation.module';
import { RouterModule } from '@angular/router';
// import { ColmenaUiModule } from '@colmena/colmena-angular-ui'
// import { ChartModule } from 'angular2-highcharts';

import { Login } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RecoverComponent } from './components/recover/recover.component';
import { Register } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { ForgotPassword } from './components/forgot/forgot.component';
 import { Highcharts } from './lib/highcharts/highcharts.component';
 import { Budget } from './components/budget/budget.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    routing,
    // ChartModule.forRoot(require('highcharts'),require('highcharts/modules/exporting'))
    //ColmenaUiModule,
  ],
  declarations: [
    PublicPages,
    Login,
    Budget,
    LogoutComponent,
    RecoverComponent,
    Register,
    ResetComponent,
    ForgotPassword,
     Highcharts
  ],

})
export class PublicPageModule { }
