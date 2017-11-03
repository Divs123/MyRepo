import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgaModule } from '../theme/nga.module';
// import { AppTranslationModule } from '../app.translation.module';
import { UserService } from './service/user-service/user.service';
//  import { AuthGuard } from './service/auth-service/auth-guard.service';
// import { AuthService } from './service/auth-service/auth.service';
// import { AuthPublicPagesService } from './service/auth-guard-public-pages/auth-public.service';
import { AuthGuard } from './service/auth-guard-public-pages/auth-guard-public.service';
import { AuthPublicPagesService } from './service/auth-guard-public-pages/auth-public.service';
import { AuthService } from './service/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgaModule,
    // AppTranslationModule
  ],
  declarations: [

  ],
  providers: [
    UserService,
    AuthGuard,
    AuthPublicPagesService,
    AuthService
  ]
})
export class AdminAuthModule { }
