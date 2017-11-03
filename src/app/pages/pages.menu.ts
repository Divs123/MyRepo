import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as lang from '../multilingual/state/lang.actions';
import { Language } from '../multilingual/model/lang.model';
import * as role from '../roles/state/role.actions';


@Injectable()
export class PagesMenuService {
  public sideMenu;
  public role;
  PAGES_MENU = [];
  language = new Language();
  resourceBundle;
  roles;
  roleValue;
  constructor(private store: Store<any>) {
this.store
      .select('role')
      .subscribe((res: any) => {
        //setting language
      this.roles=res;
     
      if( this.roles.roleDetail != null)
      {
          this.roleValue =res.roleDetail.roleDetail;

      }
            
        });
       

    this.store
      .select('lang')
      .subscribe((res: any) => {
      
        this.resourceBundle = res.resourceBundle;
        if (res.resourceBundle != null) {
          for (let j = 0; j < res.resourceBundle.length; j++) {
            this.language[res.resourceBundle[j].messageKey] = res.resourceBundle[j].customMessage;
          }
        }
      });
  }

  pageMenu() {
    this.role=localStorage.getItem('Role');

    return this.PAGES_MENU = [
      {
        path: 'pages',
        children: [
          {
            path: 'dashboard',
            data: {
              menu: {
                title: 'Dashboard',
                icon: 'ion-android-home',
                selected: false,
                expanded: false,
                order: 0,
                auth:this.role
              }
            }
          },
          {
            path: 'customer',
            data: {
              menu: {
                title: 'Askers',
                icon: 'ion-person',
                selected: false,
                expanded: false,
                order: 100,
              auth:this.role
              }
            },
          },
          {
            path: 'driver',
            data: {
              menu: {
                title: 'Taskers',
                icon: 'ion-person',
                selected: false,
                expanded: false,
                order: 100,
                auth:this.role
              }
            },
          },

          // {
          //   path: 'reports',
          //   data: {
          //     menu: {
          //       title: 'Reports',
          //       icon: 'fa fa-flag',
          //       selected: false,
          //       expanded: false,
          //       order: 100,
          //       auth:this.role
          //     }
          //   },
          //    children: [
          //     {
          //       path: 'bookings',
          //       data: {
          //         menu: {
          //           title: 'Bookings',
          //           icon: 'fa fa-file-excel-o',
          //           selected: false,
          //           expanded: false,
          //           order: 100,
          //           auth:this.role
          //         }
          //       }
          //     },
          //     {
          //       path: 'users',
          //       data: {
          //         menu: {
          //           title: 'Users',
          //           icon: 'fa fa-user-circle-o',
          //           selected: false,
          //           expanded: false,
          //           order: 100,
          //           auth:this.role
          //         }
          //       }
          //     }
          //   ]
          // },
  
        ]
      }
    ];
  }
}




