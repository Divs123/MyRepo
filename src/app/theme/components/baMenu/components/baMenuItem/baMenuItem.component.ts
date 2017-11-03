import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { AuthService } from '../../../../../auth/service/auth-service/auth.service';

import 'style-loader!./baMenuItem.scss';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html'
})
export class BaMenuItem {

  @Input() menuItem: any;
  @Input() child: boolean = false;
  

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  constructor() {
   
  }

  public onHoverItem($event): void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }


//   public authCheck(): any {
//     // console.log("-------",this.menuItem)
//     let items = [];

//     if (this.menuItem.auth) {
//       console.log("menuitems",this.menuItem)
//       if (this.menuItem.auth == 'admin') {
//         return true;
//       }
//       if (this.menuItem.auth == 'serviceProvider') {
       
       
//           if (this.menuItem.route.path == 'customer') {
//             delete this.menuItem['customer'];

//           }
//           else if (this.menuItem.route.path == 'settings') {
//              delete this.menuItem['settings'];

//            }
          
//           else{
//            items.push(this.menuItem);
//           }
         
// // console.log("items",items)
        

//         return items;
//       }
//       else return [];
//     } else {
//       items.push(this.menuItem);
//       return items;
//     }

//     // console.log(this.authService.user.role);
//     // return true;
//   }

  set() {
    
  }
}
