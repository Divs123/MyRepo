import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as io from 'socket.io-client';
import * as auth from '../auth/state/auth.actions';
import { environment } from '../environment/environment';


@Injectable()
export class CommonService {
  private url = environment.APP.API_URL;
  public socket;


  constructor(private store: Store<any>) {
    this.store
        .select('auth')
        .subscribe((res: any) => {
           if(res.loggedIn === true)
           {

           }
        });





    /*this.socket = io(this.url,{
      extraHeaders: {
        Authorization: headerToken
      }
    });*/
    // let token = localStorage.getItem('token');
    //             //var headerToken = 'Bearer '+token;
    //             let headerToken = token;
    //             this.url += '?token=' + headerToken;
    //             this.socket = io(this.url);
    //             this.socket.on('disconnect',  (socket) =>  {
    //           });

    // this.socket.on('connect', (socket) => {
    //   console.log("Connection success fully ");
    // });



    // this.socket.on('messageFromServer',  (socket) =>  {
    //   console.log("Recived message from servef ");
    //   console.log(socket);
    // });

    /*this.socket.on('notification',  (data) =>  {
      console.log("Notification recived Through server ... ");
      console.log(data);
    });*/

   /* this.socket.on('disconnect',  (messageFromServer) =>  {
      console.log("connection disconnected successfully ");
    });*/
  }




  // sendMessage(message){
  //   this.socket.emit('add-message', message);
  // }

  /*getMessages() {
    let observable = new Observable(observer => {
     // this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }*/




  getSocketConnection() {
    return this.socket;
  }


  // todo move notifiction out of this place ..

}
