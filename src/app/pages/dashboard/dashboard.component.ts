import { Component } from '@angular/core';
import { GlobalState } from '../../global.state';
import { Store } from '@ngrx/store';
import * as role from '../../roles/state/role.actions';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
 public isMenuCollapsed: boolean = false;
public roles;
roleValue;

  constructor(private _state: GlobalState,private store: Store<any>) {
  
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

      // if (this.roles === null || this.roles === undefined)
      //   {
      //     let newRole = localStorage.getItem('Role');
       
      //      this.store.dispatch({
      //       type: role.actionTypes.AUTH_ROLE,
      //       payload: {
      //           role: newRole,
      //       }
      //   });
      //   }

    //  this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
    //   this.isMenuCollapsed = isCollapsed;

       
    //  });

  }
//  public toggleMenu() {
//     this.isMenuCollapsed = !this.isMenuCollapsed;
//     this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
//     return false;
//   }
 ngOnInit() {
//  this.toggleMenu();
  }
}
