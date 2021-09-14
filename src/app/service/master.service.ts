import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MasterService {
  constructor(private http: HttpClient) {}

  apiServer = 'https://api.vettyonline.com/';

  post(apiPath: string, body: any) {
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.apiServer + apiPath, body, { headers: headers });
  }

  get(apiPath: string) {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.get(this.apiServer + apiPath, { headers: headers });
  }

  authPost(apiPath: string, body: any) {
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.apiServer + apiPath, body, { headers: headers });
  }

  authGet(apiPath: string) {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.get(this.apiServer + apiPath, { headers: headers });
  }
}
