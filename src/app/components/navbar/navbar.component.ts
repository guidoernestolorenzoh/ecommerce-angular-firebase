import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../../services/auth.service";
import {signOut} from "@angular/fire/auth";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dataUser: any;  //aqui debiera ir una interfaz

  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    public authService: AuthService,
    private toastr:ToastrService,
    private afAuth: AngularFireAuth,
  ) {
    this.location = location;
  }

  ngOnInit() {

    this.afAuth.setPersistence('local').then(() => {

      this.afAuth.currentUser.then(user => {
        if (user && user.emailVerified) {
          // if (user.emailVerified){
          this.dataUser = user;
          sessionStorage.setItem('user', JSON.stringify(this.dataUser));
          JSON.parse(sessionStorage.getItem('user'));

          // localStorage.setItem('user', JSON.stringify(this.dataUser));
          // JSON.parse(localStorage.getItem('user'));
          console.log(this.dataUser);
        } else {
          sessionStorage.setItem('user', null);
          JSON.parse(sessionStorage.getItem('user'));

          // localStorage.setItem('user', null);
          // JSON.parse(localStorage.getItem('user'));
          this.router.navigate(['../login']);
        }
      })

      this.listTitles = ROUTES.filter(listTitle => listTitle);


    })
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout() {
  //   this.afAuth.signOut()
    this.authService.logout()
  //     .then(() => {
  //       // localStorage.removeItem('user');
  //       sessionStorage.removeItem('user');
  //       this.router.navigate(['../login']);
  //     })
  //     .catch(err => {
  //       this.toastr.error(err.code, 'Error!', {
  //         positionClass: 'toast-bottom-right',
  //         progressBar: true
  //       });
  //     })
  }

 // logOut() {
 //    this.afAuth.signOut()
 //   // this.authService.logOut()
 //      .then(() => {
 //      //   // localStorage.removeItem('user');
 //        this.router.navigate(['../login']);
 //       })
 //       .catch((err) => {
 //         console.log(err);
 //       })
 //  }
}
