import { Component } from '@angular/core';
import { GlobalState } from '../../global.state';
@Component({
  selector: 'Notifications',
  template: `<router-outlet></router-outlet>`
})
export class Notifications {
public isMenuCollapsed: boolean = false;
  constructor(private _state: GlobalState) {
    //   this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
    //   this.isMenuCollapsed = isCollapsed;
    //  });
  }
//   public toggleMenu() {
//     this.isMenuCollapsed = !this.isMenuCollapsed;
//     this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
//     return false;
//   }
 ngOnInit() {
//  this.toggleMenu();
  }
}
