import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { EffectsModule } from '@ngrx/effects';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { app, AppEffects } from './state';
import { auth, AuthEffects } from './auth/state';
import { lang, LangEffects } from './multilingual/state';
// import { booking, BookingEffects } from './pages/bookings/state';
// import { promocode, PromoCodeEffects } from './pages/promocode/state';
import { dashBoard, DashboardEffects } from './pages/dashboard/state';
// import { customer, CustomerEffects } from './pages/customers/state';
// import { packages, PackagesEffects } from './pages/packages/state';
// import { reports, ReportsEffects } from './pages/reports/state';
// import { ratings, RatingsEffects } from './pages/ratings/state';
// import { messages, MessagesEffects } from './pages/messages/state';
// import { payments, PaymentsEffects } from './pages/payments/state';
// import { logicdata, LogicDataEffects } from './pages/logic-data/state';
// import { driver, DriverEffects } from './pages/driver/state';
// import { faq, FaqEffects } from './pages/cms/components/faq/state';
// import { policy, PolicyEffects } from './pages/cms/components/privacypolicy/state';
// import { terms, TermsEffects } from './pages/cms/components/terms/state';
// import { contactus, ContactUsEffects } from './pages/cms/components/contactus/state';
import { notification, NotificationEffects } from './pages/notification/state';
// import { pass, ChangePasswordEffects } from './pages/change-password/state';
import { role, RoleEffects } from './roles/state';
@NgModule({
  imports: [
    StoreModule.provideStore({
      app,
      auth,
      lang,
      // booking,
      dashBoard,
      // customer,
      // packages,
      notification,
      // driver,
      // pass,
      role,
      // reports,
      // faq,
      // contactus,
      // policy,
      // terms,
      // messages,
      // ratings,
      // payments,
      // logicdata,
      // promocode
    }),

    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: false,
        position: 'right'
      })
    }),

    EffectsModule.run(AppEffects),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(LangEffects),
    // EffectsModule.run(BookingEffects),
    EffectsModule.run(DashboardEffects),
    // EffectsModule.run(CustomerEffects),
    // EffectsModule.run(PackagesEffects),
    EffectsModule.run(NotificationEffects),
    // EffectsModule.run(DriverEffects),
    // EffectsModule.run(ChangePasswordEffects),
    EffectsModule.run(RoleEffects),
    // EffectsModule.run(ReportsEffects),
    // EffectsModule.run(FaqEffects), 
    // EffectsModule.run(ContactUsEffects),
    // EffectsModule.run(PolicyEffects),
    // EffectsModule.run(TermsEffects),
    // EffectsModule.run(MessagesEffects),
    // EffectsModule.run(RatingsEffects),
    // EffectsModule.run(PaymentsEffects),  
    // EffectsModule.run(LogicDataEffects),  
    // EffectsModule.run(PromoCodeEffects)
  ],
})
export class AppStoreModule {}
