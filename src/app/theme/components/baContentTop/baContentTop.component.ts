import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as lang from '../../../multilingual/state/lang.actions';
import * as app from '../../../state/app.actions';
import { Language } from '../../../multilingual/model/lang.model';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle: string = '';
  language = new Language();

  constructor( private store: Store<any>) {
    this.store
        .select('app')
        .subscribe((res: any) => {
          if(res.activeMenuItem && res.activeMenuItem.title)
          {
              this.activePageTitle = res.activeMenuItem.title;
              //console.log("respones of app.......side bar.......",res.activeMenuItem)
          }
           
        });

   

   ///language settingss
    this.store
        .select('lang')
        .subscribe((res: any) => {
            //console.log("this is in menu services",res)
            //setting language
            if (res.resourceBundle != null)
            {
                for (let j = 0; j < res.resourceBundle.length; j++)
                {
                    //console.log("helloooooo..............")
                    this.language[res.resourceBundle[j].messageKey] = res.resourceBundle[j].customMessage;
                    //console.log(this.language.home)
                }
            }
        });
  }
}
