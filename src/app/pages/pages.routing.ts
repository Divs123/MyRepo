import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../theme/services/authService/authGuard.service';

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'customer', loadChildren: 'app/pages/customers/customers.module#CustomersModule'},
      { path :'driver' ,loadChildren: 'app/pages/driver/driver.module#DriverModule'},
      { path: 'notification', loadChildren: 'app/pages/notification/notifications.module#NotificationsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
