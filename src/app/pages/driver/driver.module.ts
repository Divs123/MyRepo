import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { routing }  from './driver.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { DriverComponent } from './driver.component';
import { AllDriverComponent } from './components/all-drivers/all-drivers.component';

@NgModule({
imports:[
    routing
],
declarations:[
    DriverComponent,
    AllDriverComponent
],
entryComponents:[

]
})

export class DriverModule{}