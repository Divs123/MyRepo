import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { cloneDeep, random } from 'lodash';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environment/environment';
import * as io from 'socket.io-client';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  public user = null;
  redirectUrl: '/pages';
  jwtHelper: JwtHelper = new JwtHelper();
  private lastInserted: number[] = [];
  public url = environment.APP.API_URL;
  public socket;
  public options;
  login() {
    this.options = this.toastrService.toastrConfig;
    // let token = JSON.parse(localStorage.getItem('token'));
    let token = localStorage.getItem('token');
    if (token) {
      if (!this.socket) {
        this.url += '/?access_token=' + token;
        this.socket = io(this.url);
        this.socket.on('connect', (socket) => {
          console.log('Connected successfully !');
        });
        this.socket.on('messageFromServer', (data) => {
          console.log('msg from server',data);
        });
        this.socket.on('notification', (data) => {
              let m=  data.notification.message;
              let t = 'Notification';
              const opt = cloneDeep(this.options);
              opt.positionClass = 'toast-bottom-right';
              const inserted = this.toastrService[types[0]](m,t, opt);
              if (inserted) {
                this.lastInserted.push(inserted.toastId);
              }
        });
        // this.socket.on('BOOKING_COMPLETE', (data) => {
        //   console.log(data);
        // });
        this.socket.on('disconnect', (socket) => {
          console.log('Disconnected successfully !');
        });

        this.isLoggedIn = true;
        return this.isLoggedIn;
      }
    }
    else {
      this.isLoggedIn = false;
      return this.isLoggedIn;
    }

  }

  /*login() {
    let token = localStorage.getItem('token');

    // token exist and is not expired
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      //console.log("token present")
      this.user = this.jwtHelper.decodeToken(token);
      if (this.socket != null) {
        //let token = localStorage.getItem('token');
        //var headerToken = 'Bearer '+token;
        // let headerToken = token;
        // this.url += '?token=' + headerToken;
        console.log(this.url);
        this.socket = io(this.url);
        this.socket.on('connect', (socket) => {
          console.log("Connected successfully !");
        });

        this.socket.on('disconnect', (socket) => {
          console.log("Disconnected successfully !");
        });
      }

      //console.log('Loged in user ');
      //console.log(this.user);
      this.isLoggedIn = true;
      //console.log(token)
      return this.isLoggedIn;
    }
    else {
      this.isLoggedIn = false;
      return this.isLoggedIn;
    }

  }*/

  getSocketConnection() {
    if (this.socket) {
      console.log('socket true');
      return this.socket;
     
    }
    else {
      console.log('socket falseee');
      return null;
    }
  }


  logout(): void {
    console.log('log out successfully');
    if (this.socket) this.socket.close();
    this.socket = null;
    window.localStorage.removeItem('token');
  }
  constructor(
    private toastrService: ToastrService
  ) { }
}
