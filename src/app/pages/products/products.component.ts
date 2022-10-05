import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ConexionService } from "../../services/conexion.service";
import {Product} from "../../models/product";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // title:"Editar Product";
  products: Product[];
  editProduct: any;

  constructor(private conexion:ConexionService) {

    // this.products = firestore.collection('products').valueChanges();
    this.conexion.productList().subscribe(res=>{
        this.products = res;
      });
  }



  ngOnInit(): void {
  }

  eliminarProduct(id: string) {
    this.conexion.productDelete(id);
  }


  // editProdu(product) {
  //   this.editProduct = this.conexion.editProd(product);
  // }
}

