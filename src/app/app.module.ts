import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAuthModule } from './auth/auth.module';
import { AUTH_PROVIDERS, provideAuth , JwtHelper } from 'angular2-jwt';
import { AuthGuard } from './theme/services/authService/authGuard.service';
import { AuthService } from  './auth/service/auth.service';
import { CommonService } from './services/common.service';
import { CustomerService } from './services/customer-service/customer.service';
import { DashboardService } from './services/dashboard-service/dashboard.service';
import { NotificationService } from './services/notification/notification.service';
import { ApiService } from './services/api-service/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppVersionService } from './services/app-version-service/app-version.service';
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { AppStoreModule } from './app.store';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicPageModule } from  './publicPages/public-pages.module';
import { RolesModule } from  './roles/role.module';
import { CsvService } from 'angular2-json2csv';
import { OrderModule } from 'ngx-order-pipe';
const APP_PROVIDERS = [
  AppState,
  GlobalState
];
export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    AdminAuthModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(), // ToastrModule added
    AppStoreModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    PublicPageModule,
    NgxPaginationModule,
    RolesModule,
    routing,
    OrderModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AuthService,
    AppVersionService,
    CustomerService,
    NgbActiveModal,
    CommonService,
    DashboardService,
    ApiService,
    AuthGuard,
    JwtHelper,
    NotificationService,
    CsvService,
    provideAuth({
      headerName: 'Authorization',
      tokenName: 'token',
      tokenGetter: (() => sessionStorage.getItem('token')),
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: true
    })
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef,
              public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
