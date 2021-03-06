import { Component } from '@angular/core';
import { GlobalState } from '../../../global.state';
import 'style-loader!./baPageTop.scss';
import { AuthService  } from '../../../auth/service/auth.service';
// import { AuthService } from '../../services/authService/auth.service';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import * as pass from '../../../pages/change-password/state/change-password-modal.action';
import * as lang from '../../../multilingual/state/lang.actions';
import { Language } from '../../../multilingual/model/lang.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// import { ChangePasswordModal } from '../../../pages/change-password/component/change-password-modal.component';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop {
  resourceBundle;
  public isScrolled: boolean;
  public isMenuCollapsed: boolean = false;
  language = new Language();

  constructor(private _state: GlobalState,
              private store: Store<any>,
              private router: Router,
              private authService: AuthService,
               private modalService: NgbModal) {
    // this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
    //   this.isMenuCollapsed = isCollapsed;
    // });

    this.store
        .select('lang')
        .subscribe((res: any) => {
          this.resourceBundle = res.resourceBundle;
            //console.log("this is in menu services",res)
            //setting language
            if (res.resourceBundle != null)
            {
                for (let j = 0; j < res.resourceBundle.length; j++)
                {
                    //console.log("helloooooo..............")
                    this.language[res.resourceBundle[j].messageKey] = res.resourceBundle[j].customMessage;

                }
            }



        });




  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
      if(this.isScrolled != undefined){
    this.isScrolled = isScrolled;
      }
  }
  logout(){
    this.store.dispatch(new auth.AuthLogoutAction());
    // console.log("looged out")
    // this.UserService.logoutUser().subscribe((result) => {
    //     console.log(result);
    //     if(result.message='success'){
    //       //clear localstorage
    //       this.authService.logout();
    //       this.router.navigate(['login']);
    //     }
    //   }
    //   , (error) => {
    //     console.log(error)
    //   }
    // );
  }
  // changePassword(){
  //   // this.store.dispatch()

  //    const changePasswordActionModal = this.modalService.open(ChangePasswordModal, { size: 'lg' });
  //   changePasswordActionModal.componentInstance.modalHeader = 'Large Modal';


  // }
}
