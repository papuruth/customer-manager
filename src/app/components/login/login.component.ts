import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  isSubmitted = false;
  isloggedin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    //   this.authService.isLoggedIn().subscribe(user => {
    //     if (user) {
    //       this.router.navigate(['/']);
    //     } else {
    //       this.router.navigate(['/app-zacebuk-login']);
    //     }
    //  });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get formControls() { return this.loginForm.controls; }
  login() {
    // stop here if form is invalid
    console.log(this.loginForm.invalid);
    console.log(this.formControls);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // user loggin code
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    // this.authService.login(this.formControls.email.value, this.formControls.password.value);
  }
}
