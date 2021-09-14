import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Check for active
  //isLoggedIn = sessionStorage.getItem('WM-MYSALESBOOK-SESSIONID') ? true : false;
  isLoggedIn = false;
  UserId: string;
  Email: string;
  Name: string;
  SpreadSheetId: string;
  userRole: string;

  constructor() {}

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    sessionStorage.removeItem('sId');
    sessionStorage.removeItem('name');
    return null;
  }

  readCustomerData(uId) {
    return uId;
  }
}
