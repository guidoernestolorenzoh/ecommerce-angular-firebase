import {Injectable, NgZone} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {signOut, user} from '@angular/fire/auth';
import {ToastrService} from "ngx-toastr";

import { User } from '../models/user';
import {Observable, of, switchMap } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  user$: Observable<User>;


  constructor(
    // public auth: Auth,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastr:ToastrService,
    private router: Router,
    private ngZone: NgZone,
  ) {

    // @ts-ignore
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // )



    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });



  }

  // async googleSignIn(){
  //   const provider = new auth.GoogleAuthProvider();
  //   // @ts-ignore
  //   const credentials = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }



  LogIn(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
      // .then((res) =>{
      //   this.afAuth.authState.subscribe((user)=>{
      //     if (user){
      //       this.router.navigate(['../dashboard',]);
      //     }
      //   });
      // })
      // .catch((error)=>{
      //   this.toastr.error(error.message, 'Error!', {
      //     positionClass: 'toast-bottom-right',
      //     progressBar: true
      //   });
      // })

  }

  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      // .then((res) => {
      //   this.loading = false;
      //   this.verifyEmail();
      //   this.router.navigate(['../login']);
      // })
      // .catch((error) => {
      //   this.toastr.error((error.code), 'Error!', {
      //     positionClass: 'toast-bottom-right',
      //     progressBar: true
      //   });
      // })

  }


  // logOut() {
  //   this.afAuth.signOut()
  //     .then(() => {
  //       // localStorage.removeItem('user');
  //       this.router.navigate(['../login']);
  //     })
  //     .catch(err => {
  //       this.toastr.error(err.code, 'Error!', {
  //         positionClass: 'toast-bottom-right',
  //         progressBar: true
  //       });
  //     })
  // }



  // async SignUp(email: string, password: string) {
  //   try{
  //     return await this.afAuth.createUserWithEmailAndPassword(email, password);
  //   }
  //   catch(err){
  //     console.log("error al registrar", err);
  //     return null;
  //   }

  // register(email: any, password: any): Promise<any> {
  //   return createUserWithEmailAndPassword(this.auth, email, password);


  verifyEmail() {
    return this.afAuth.currentUser
      // .then((user) => user.sendEmailVerification())
      // .then(() => {
      //   this.toastr.info('We sent you an email, check your Email', 'Verify email', {
      //     positionClass: 'toast-bottom-right',
      //     progressBar: true
      //   });
      // })

      // .catch((error) => {
      //   console.log(error);
      // })
  }



  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   return user !== null && user.emailVerified !== false ? true : false;
  // }

  // private updateUserData({uid, email, displayName, photoURL }: User) {
  //   const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
  //   const data = {
  //     uid,
  //     email,
  //     displayName,
  //     photoURL
  //   };
  //   return userRef.set(data, {merge:true});
  // }

  logout() {
    // return signOut();
    this.afAuth.signOut()
    // // this.authService.logOut()
      .then(() => {
    //     localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        this.router.navigate(['../login']);
      })
      .catch(err => {
        this.toastr.error(err.code, 'Error!', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      })
  }

  loginWithGoogle() {
  // return signInWithPopup(GoogleAuthProvider());
  return this.AuthLogin(new GoogleAuthProvider());
}

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((res) => {
        this.updateUserData(res.user)
        this.toastr.success('Usuario Logueado Satisfactoriamente', 'Bienvenido', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.router.navigate(['../dashboard']);
      })
      .catch((err) =>{
        this.toastr.error(err.code, 'Error!', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.router.navigate(['../login']);
      })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true });
  }

  // private checkAuthorization(user:User, allowedRoles:string[]): boolean{
  //   if (!user) return false
  //   for (const role of allowedRoles){
  //     if(user.roles[role]){
  //       return true
  //     }
  //   }
  //   return false
  // }

  // canRead(user:User): boolean{
  //   const allowed = ['admin', 'editor', 'subscriber']
  //   return this.checkAuthorization(user, allowed)
  // }

  // canEdit(user:User): boolean{
  //   const allowed = ['admin', 'editor']
  //   return this.checkAuthorization(user, allowed)
  // }

  // canDelete(user:User): boolean{
  //   const allowed = ['admin']
  //   return this.checkAuthorization(user, allowed)
  // }



}


