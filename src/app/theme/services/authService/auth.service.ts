// import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';



// @Injectable()
// export class AuthService {
//   isLoggedIn: boolean = false;
//   isRegistred: boolean = false;
//   // store the URL so we can redirect after logging in
//   redirectUrl: '/pages';


//   login() {
//     let token = localStorage.getItem('token');
//     console.log('value in auth service',token);
//     if (token){
//       console.log("token present",token);
//        this.isLoggedIn = true;
//        //console.log(token)
//        return this.isLoggedIn;
//     }
//     else {
//       console.log("token not present",token);
//           this.isLoggedIn = false;
//           return this.isLoggedIn;
//     }
//   }


//   register() {
//     let token = localStorage.getItem('tokenSession');
//     if (token){
//       //console.log("token present")
//        this.isRegistred = true;
//        //console.log(token)
//        return this.isRegistred;
//     }
//     else {
//           this.isRegistred = false;
//           return this.isRegistred;
//     }
//   }


//    logout(): void {
//      window.localStorage.removeItem('tokenSession');
//    }

// }
