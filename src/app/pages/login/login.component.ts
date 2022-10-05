import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {FirebaseErrorsService} from "../../services/firebase-errors.service";
import {any} from "codelyzer/util/function";
import {user} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  formLogin = FormGroup;
  loading: boolean = false;

  constructor(
    private fb:FormBuilder,
    private toastr:ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fError: FirebaseErrorsService,
    private authService: AuthService
  ) {
     // @ts-ignore
    this.formLogin = this.fb.group({
      email: ['',Validators.compose([Validators.email, Validators.required])],
      password: ['',Validators.required]
    })


  }

  ngOnInit() {
  }

  onSubmit() {
    // @ts-ignore
    const email = this.formLogin.value.email;
    // @ts-ignore
    const password = this.formLogin.value.password;

    this.loading = true;

    // this.afAuth.setPersistence('local').then(() => {
      this.authService.LogIn(email, password)
      // this.afAuth.signInWithEmailAndPassword(email, password)
        .then((user) => {

          // this.currentUser = user.user;

          // this.afAuth.authState.subscribe((user) => {
          //   if (user) {
          //     this.router.navigate(['dashboard']);
          //   }
          // });
          if (user.user?.emailVerified) {
            this.router.navigate(['../dashboard']);
          } else {
            this.router.navigate(['../verify-email']);
          }
          this.loading = false;

        })
        .catch((error) => {
          this.loading = false;
          // this.toastr.error('Usuario o contraseña incorrectos', 'Error!', {
          this.toastr.error(this.fError.firebaseError(error.code), 'Error!', {
            // this.toastr.error(error.message, 'Error!', {
            positionClass: 'toast-bottom-right',
            progressBar: true
          });
        })
    // })





  }

  loginGoogle(){
    this.authService.loginWithGoogle()
  //     .then(response => {
  //       this.router.navigate(['../dashboard']);
  //     })
  //     .catch((error) => {
  //       this.toastr.error(error.code, 'Error!', {
  //           positionClass: 'toast-bottom-right',
  //           progressBar: true
  //         });
  //     })
  }


}
//Todo: agregar login por roles, es decir, establecer roles y segun estos el usuario pueda escribir o no.
