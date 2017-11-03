import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
    selector: 'all-drivers',
    template: 'all-drivers.html'
})

export class AllDriverComponent implements OnInit{
    constructor(private store:Store<any>){
        console.log('all driver component it is');
    }

    ngOnInit(){
        console.log('ng onit');
        // this.store.dispatch({
        //      type: 
        // });
    }


}