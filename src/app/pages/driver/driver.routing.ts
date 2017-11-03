import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver.component';
import { AllDriverComponent } from './components/all-drivers/all-drivers.component'

const routes: Routes = [{
    path: '',
    component: DriverComponent,
    children: [     
        { path: '', redirectTo: 'alldrivers', pathMatch: 'full' },
        { path: 'alldrivers', component: AllDriverComponent }
    ]
 }  
];

export const routing = RouterModule.forChild(routes);