import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
// import {FirebaseErrorsService} from "../../services/firebase-errors.service";
import {CustomValidator} from "../../shared/CustomValidator/custom-validator";
import {FirebaseErrorsService} from "../../services/firebase-errors.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister = FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fError: FirebaseErrorsService,
  ) {
    // @ts-ignore
    // this.formRegister = new FormGroup({
    //   email: new FormControl(),
    //   password: new FormControl()
    // })


    this.formRegister = this.fb.group({
      // email: ['',[Validators.required, Validators.email]],
      email: ['',Validators.compose([Validators.email, Validators.required])],
      // password: ['',[Validators.required, Validators.minLength(8)]],
      password: ['',[Validators.compose([Validators.required, CustomValidator.patternValidator(/\d/,{hasNumber:true}),
              CustomValidator.patternValidator(/[A-Z]/,{hasCapitalCase:true}),
              CustomValidator.patternValidator(/[a-z]/,{hasSmallCase:true}),
              CustomValidator.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,{hasSpecialCharacter:true}),
      ]), Validators.minLength(8)]],
      repeatPassword: ['',[Validators.required, Validators.minLength(8)]]
    },{
     validators:CustomValidator.mustMatch
     // validators:this.mustMatch('password','repeatpassword')
      })
  }


  ngOnInit(): void {
  }

  onSubmit() {
    // @ts-ignore
    // console.log(this.formRegister);

    this.submitted = true
      // @ts-ignore
    const email = this.formRegister.value.email;
    // @ts-ignore
    const password = this.formRegister.value.password;
    // @ts-ignore
    const repeatPassword = this.formRegister.value.repeatPassword;

    // @ts-ignore
    // if (this.formRegister.invalid) {
    //   return;
    // }
    // alert("Succes");

    // if(password !== repeatPassword){
    //   this.toastr.error('Las contraseñas no coinciden', 'Error!', {
    //     positionClass: 'toast-bottom-right',
    //     progressBar: true
    //   });
    //   return;
    // }

    this.loading = true;



    this.authService.SignUp(email, password)
    // this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.loading = false;
        this.verifyEmail();
        this.toastr.success('El usuario fue creado satisfactoriamente', 'Nuevo Usuario Creado!', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.router.navigate(['../login']);
      })
      .catch((error) => {
        this.loading = false;
        // this.toastr.error('Error al registrar el usuario' , 'Error!', {
        this.toastr.error(this.fError.firebaseError(error.code), 'Error!', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      })
  }
  verifyEmail() {
    // this.afAuth.currentUser
    this.authService.verifyEmail()
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info('We sent you an email, check your Email', 'Verify email', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.router.navigate(['../login']);
      });

  }

}


