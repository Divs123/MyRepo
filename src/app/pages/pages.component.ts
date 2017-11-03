import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalState } from '../global.state';
import { Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaMenuService } from '../theme';
import { PagesMenuService } from './pages.menu';
import * as lang from '../multilingual/state/lang.actions';
import * as role from '../roles/state/role.actions';

// import {Language} from '../multilingual/model/lang.model.ts'
@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class=" container al-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://click-labs.com/">@Click labs</a> </div>
        <!--<ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>-->
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {
  PAGES_MENU;
  public isMenuCollapsed: boolean = false;
  resourceBundle;
  roleValue;
  roles;
  constructor(private _state: GlobalState, private _menuService: BaMenuService, private PagesMenuService: PagesMenuService, private store: Store<any>) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    //
    this.store
      .select('role')
      .subscribe((res: any) => {
       
        //setting language
        this.roles = res.roleDetail;

        if (this.roles != null) {

          this.roleValue = res.roleDetail.roleDetail;


        }

      });


    if (this.roles === null || this.roles === undefined) {
     
      let newRole = localStorage.getItem('Role');
 
      this.store.dispatch({
        type: role.actionTypes.AUTH_ROLE,
        payload: {
          role: newRole,
        }
      });
    }
    //this.PAGES_MENU = this.PagesMenuService.pageMenu();



    this.store
      .select('lang')
      .subscribe((res: any) => {
       
        this.resourceBundle = res.resourceBundle;
      
        if (res.resourceBundle != null) {
          this.PAGES_MENU = this.PagesMenuService.pageMenu();
          this._menuService.updateMenuByRoutes(<Routes>this.PAGES_MENU);

        }


      });

    if (this.resourceBundle === null) {
      let selectedLanguage = localStorage.getItem('currentLanguage');
      //console.log(selectedLanguage)
      this.store.dispatch({ type: lang.actionTypes.GET_ALL_RESOURCE_BUNDLE, payload: selectedLanguage });
      //this.PAGES_MENU = this.PagesMenuService.pageMenu();
    }

    //this.onLoad();
  }
//   public toggleMenu() {
//     this.isMenuCollapsed = !this.isMenuCollapsed;
//     this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
//     return false;
//   }
//   visible: boolean = true;
//   @Output() open: EventEmitter<any> = new EventEmitter();
//   @Output() close: EventEmitter<any> = new EventEmitter();
//   toggle() {
//     this.visible = !this.visible;
//     if (this.visible) {
//       this.toggleMenu();
//     } else {
//       this.toggleMenu();
//     }
//   }


}
