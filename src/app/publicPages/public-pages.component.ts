import { Component } from '@angular/core';
import { Routes } from '@angular/router';


@Component({
  selector: 'publicpages',
  template: `
   
      <div>
        <router-outlet></router-outlet>
      </div>
    
   
       
        
     
    `
})
export class PublicPages {

  constructor() {
  }


}
