import { Component } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // products: Observable<any[]>;
  // constructor(firestore: AngularFirestore){
  //   this.products = firestore.collection('products').valueChanges();
  // }
}
