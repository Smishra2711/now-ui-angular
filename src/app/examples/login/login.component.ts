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
  focus;
  focus1;
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

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('hidden');
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  sendOtp() {
    //Verify the login form
    if (!this.showOtp) {
      this.statusMessage = 'loading...';
      var ph
      if (this.loginForm.get('phoneNumber').value != null) {
        var data = {
          phoneCode: '+91',
          phoneNumber: this.loginForm.get('phoneNumber').value
        };

        this.service.post('user/send-otp', data).subscribe(
          res => {
            if (res) {
              this.result.push(res);
              if (this.result[0].message === 'OTP Sended') {
                this.showOtp = true;
                this.loginForm.get('phoneNumber').disable();
                this.statusMessage = 'Validate Otp';
              }
            }
          },
          err => {
            alert(err.message);
            this.statusMessage = 'Send Otp';
          }
        );
      } else {
        //Validate form field
        alert('please enter phone');
      }
    } else {
      this.submit();
    }
  }

  submit() {
    // Verify the OTP send.
    if (this.showOtp && this.loginForm.get('otp').value != null) {
      var data = {
        otp: this.loginForm.get('otp').value,
        phoneCode: '+91',
        phoneNumber: this.loginForm.get('phoneNumber').value
      };

      this.service.post('user/verify-otp', data).subscribe(
        res => {
          if (res) {
            this.result = []; //empty data response array
            this.result.push(res);
            if (this.result[0].message === 'OTP Verified') {
              if (this.result[0].isNewUser) {
                //
                this.newUser = true;
                this.showOtp = false;
              }
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('token', this.result[0].token); //auth token
              this.router.navigate(['/dashboard']);
            } else {
              alert(this.result[0].message);
            }
          }
        },
        err => {
          alert(err);
        }
      );
    }
  }
}
