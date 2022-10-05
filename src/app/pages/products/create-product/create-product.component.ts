import { Component, OnInit } from '@angular/core';
import {ConexionService } from 'src/app/services/conexion.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  title = 'Create Product';

  createProd: FormGroup;
  id: string | null;
  submitted = false;


  constructor(
    private fb:FormBuilder,
    private conexion:ConexionService,
    private router:Router,
    private toastr:ToastrService,
    private aRoute:ActivatedRoute
  ) {
    this.createProd = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      description: [''],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.prodEdit();
  }

  addProduct() {

    const product: any = {
      name: this.createProd.value.name,
      price: this.createProd.value.price,
      description: this.createProd.value.description,
    }
    this.conexion.productAdd(product).then(() => {
      this.toastr.success('The Product was added successfully', 'Product added!', {
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
      this.router.navigate(['/products']);
    }).catch(e => {
      this.toastr.error('The Product was not added', 'Error!', {
        positionClass: 'toast-bottom-right',
        progressBar: true
      });

    })
  }

  addEditProd() {
    this.submitted = true;
    if(this.createProd.invalid){
      return;
    }
    if(this.id === null){
      this.addProduct();
    }else {
      this.editProd(this.id);
    }

  }

  editProd(id:string) {
    const product: any = {
      name: this.createProd.value.name,
      price: this.createProd.value.price,
      description: this.createProd.value.description,
    }
    this.conexion.productEdit(id, product).then(() => {
      this.toastr.info('The Product was modified successfully', 'Product modified!!', {
        positionClass: 'toast-bottom-right',
        progressBar: true
      })
      this.router.navigate(['/products']);
    })
  }

  prodEdit(){
    if(this.id !== null){
      this.title = 'Edit Product';
      this.conexion.getProduct(this.id).subscribe(
        (data => {
          this.createProd.setValue({
            name:data.payload.data()['name'],
            price:data.payload.data()['price'],
            description:data.payload.data()['description'],
          })
        })
      )
    }
  }


}
