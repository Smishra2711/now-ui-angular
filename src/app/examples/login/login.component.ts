import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterServiceService } from 'app/service/master-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: Date = new Date();
  showOtp = false;
  newUser = false;
  result = [];
  statusMessage = 'Send Otp';
  loginForm: FormGroup;

  constructor(
    private service: MasterServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      otp: ['']
    });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  login() {}
}
