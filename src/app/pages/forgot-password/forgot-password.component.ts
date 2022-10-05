import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {CustomValidator} from "../../shared/CustomValidator/custom-validator";
import {FirebaseErrorsService} from "../../services/firebase-errors.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loading: boolean = false;
  formForgotPassword = FormGroup;

  constructor(
    private fb:FormBuilder,
    private toastr:ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fError: FirebaseErrorsService,
  ) {
    // @ts-ignore
    this.formForgotPassword = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
    })
  }

  ngOnInit(): void {
  }


  forgotPassword() {
    this.loading = true;

    // @ts-ignore
    const email = this.formForgotPassword.value.email;

    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.loading = false;
        this.toastr.info('We send you an email to reset the password', 'Email Sent!', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.router.navigate(['../login']);
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.fError.firebaseError(error.code), 'Error!', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      })

  }
}
