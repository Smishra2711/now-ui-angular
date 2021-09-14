import { Injectable } from '@angular/core';
import { MasterService } from './master.service';

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

  constructor(private service: MasterService) {}

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(email, password) {
    return null;
  }

  register(email, password) {
    return null;
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
