import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  data = [];
  statusMessage = 'Send Otp';
  loginForm: FormGroup;

  constructor(
    private service: MasterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('hidden');

    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      otp: ['']
    });
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
      if (this.loginForm.get('phoneNumber').value != null) {
        var data = {
          phoneCode: '+91',
          phoneNumber: this.loginForm.get('phoneNumber').value
        };

        this.service.post('user/send-otp', data).subscribe(
          res => {
            if (res) {
              this.data.push(res);
              if (this.data[0].message === 'OTP Sended') {
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
            this.data = []; //empty data response array
            this.data.push(res);
            if (this.data[0].message === 'OTP Verified') {
              if (this.data[0].isNewUser) {
                //
                this.newUser = true;
                this.showOtp = false;
              }
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('token', this.data[0].token); //auth token
              this.router.navigate(['/dashboard']);
            } else {
              alert(this.data[0].message);
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
