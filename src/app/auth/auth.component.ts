import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthModule } from './auth.module';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode = true;

  constructor(private authService: AuthenticationService, private router: Router) { }

  @ViewChild('f') form;

  validity = true;
  errorMessage: string = null;

  ngOnInit() {
    console.log('auth component initiated');
    this.loginMode = true;
    this.errorMessage = null;
  }

  switchMode() {
    this.loginMode = !this.loginMode;
    this.form.reset();
    this.errorMessage = null;
    this.validity = true;
  }

  onSubmit(form: NgForm) {
    const controls = form.value;
    this.checkValidity(form);
    if (!form.valid || !this.validity) {
      return;
    }
    if (this.loginMode) {
      this.authService.authenticate(controls.email, controls.password).subscribe(response => {
        this.validity = true;
      }, error => {
        this.handleError(error);
      });
    } else {
      this.authService.signUp(controls.email, controls.password).subscribe(response => {
        this.validity = true;
      }, error => {
        this.handleError(error);
      }
      );
    }
  }

  checkValidity(form: NgForm) {
    if (!this.loginMode && form.value.password !== form.value.confirmPassword) {
      this.validity = false;
      this.errorMessage = 'password do not match!';
    } else {
      this.validity = true;
      this.errorMessage = null;
    }
    return;
  }

  handleError(error: string) {
    this.errorMessage = error;
    this.validity = false;
  }
}
