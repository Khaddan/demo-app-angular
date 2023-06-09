import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 public products:Array<Product>=[];
 public keyword:string="";
  constructor(private productService:ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(){

    this.productService.getProducts()
      .subscribe({
        next : data => {
          this.products=data
        },
        error : err => {
          console.log(err);
        }
      })


   // this.products=this.productService.getProducts();

  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next : updatedProducts => {
          this.getProducts();
        },
        error : err => {
          console.log(err);
        }
      })


   }

  handleDelete(product:Product) {
    if(confirm("Etes vous sur ?"))
    this.productService.deleteProduct(product)
      .subscribe({
      next:value => {
        //this.getProducts();
        this.products=this.products.filter(p=>p.id!=product.id);
      }
    })
  }

  handleSearch() {
    this.productService.searchProduct(this.keyword).subscribe({
      next:value => {
        this.products=value;
      }
    })
  }
}
