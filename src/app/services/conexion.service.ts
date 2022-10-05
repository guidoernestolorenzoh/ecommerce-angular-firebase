import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {map, Observable} from 'rxjs';
import { Product } from '../models/product';


// export interface Product {
//     name: string;
//     price: number;
//     description: string;
// }


@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  private productDoc: AngularFirestoreDocument<Product>;


  constructor(private afs:AngularFirestore){
                                                                                //order by name asc
    this.productsCollection = afs.collection<Product>('products', ref => ref.orderBy('name', 'asc'));
    // this.products = this.productsCollection.valueChanges();
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  productList() {
    return this.products;
  }

  getProduct(id: string):Observable<any> {
    return this.afs.collection('products').doc(id).snapshotChanges();
  }

  productAdd(product:Product): Promise<any> {
    return this.productsCollection.add(product);
  }

  productDelete(id: string) {
    return this.afs.collection('products').doc(id).delete();
    // this.productDoc = this.afs.doc<Product>(`products/${product.id}`);
    // this.productDoc.delete();
  }

  // @ts-ignore
  productEdit(id:string, data: any): Promise<any> {
    return this.afs.collection('products').doc(id).update(data);
    // this.productDoc = this.afs.doc<Product>(`products/${product.id}`);
    // this.productDoc.update(product);
  }

}
