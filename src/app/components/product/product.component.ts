import { NgForm } from '@angular/forms';
import { IProduct } from './../../models/IProduct';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  template: `
    <br>
    <div class="card">
      <div class="card-header">
        {{ title }}
      </div>
      <div *ngIf="product" class="card-body">
        <div *ngIf="this.productUpdated" class="alert alert-success">Product updated</div>
        <ul class="list-group">
          <li class="list-group-item">Product id: <b>{{ product.id }}</b></li>
          <li class="list-group-item">Product title: <b>{{ product.title }}</b></li>
          <li class="list-group-item">Product count: <b>{{ product.count }}</b></li>
          <li class="list-group-item">Product price: <b>{{ product.price }}</b></li>
        </ul>
      </div>
      <div class="card-body">
        <form #productCreationForm="ngForm" (ngSubmit)="onSubmit(productCreationForm)">
          <div class="form-group">
            <label for="title">Product Title</label>
            <input name="title" type="text" class="form-control" id="title" #title_var="ngModel" [(ngModel)]="product.title" required>
            <div [hidden]="title_var.valid || title_var.untouched" class="alert alert-danger">Please don't leave the value empty</div>
            <label for="count">Product Count</label>
            <input name="count" type="number" class="form-control" id="count" #count_var="ngModel" [(ngModel)]="product.count" required>
            <div *ngIf="!count_var.valid && count_var.touched"><p style="color: red; font-size: 10px">Please don't leave this empty!</p></div>
            <label for="price">Product Price</label>
            <input name="price" type="number" class="form-control" id="price" #price_var="ngModel" [(ngModel)]="product.price" required>
            <div *ngIf="!price_var.valid && price_var.touched"><p style="color: red; font-size: 10px">Please don't leave this empty!</p></div>
          </div>
          <button type="submit" [disabled]="productCreationForm.invalid || !productCreationForm.dirty" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="card-footer">
      <button class="btn btn-outline-secondary" (click)="onBack()">
        <!-- <i class="fa fa-chevron-circle-left"></i> Back -->
        <i class="fa fa-backward"></i> Back
      </button>
      </div>
    </div>
  `,
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  title = 'Product';
  product: IProduct;
  productUpdated: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  startMessageTimout(): void {
    setInterval(() => { this.productUpdated = false; }, 1500);
  }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params['id']);
    // console.log(typeof +this.activatedRoute.snapshot.paramMap.get('id'));
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.title += `: ${id}`;
    this.productService.getProductById(id).subscribe(
      res => this.product = res,
      err => console.log(err)
    );
  }

  onBack(): void {
    // console.log("Log!!!");
    this.router.navigate(['/products']);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.productService.updateProduct(this.product.id, form.value).subscribe(
        res => {
          this.productService.getProductById(this.product.id).subscribe(
            updatedProduct => {
              this.product = updatedProduct;
              this.productUpdated = true;
            },
            err => console.log(err)
          );
        },
        err => console.log()
      );
    }
    this.startMessageTimout();
    form.resetForm();
  }
}
