import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MultilingualService } from  '../multilingual/service/multilingual-service/multilingual.service';
import { RoleService } from  './service/role.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
  ],
  providers: [
   MultilingualService,
   RoleService
  ]
})
export class RolesModule { }
