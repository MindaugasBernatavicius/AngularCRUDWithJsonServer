import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/IProduct';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  styleUrls: ['./products.component.css'],
  template: `
    <br>
    <label>Filter:</label>
    <input type="text" (input)="onFilter($event.target.value)">
    <br>
    <br>
    <div class="card">
      <div class="card-header">Table of products</div>
      <div class="card-body">
        <table *ngIf="filteredProducts.length" class="table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Count</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor='let product of filteredProducts'>
            <td><a [routerLink]="['/products', product.id]">{{ product.title | convertToSpace:'-' | convertToSpace:'&' }}</a></td>
            <td>{{ product.count }}</td>
            <td>{{ product.price | currency: 'USD':'symbol':'4.2-2' }}</td>
            <td><button class="btn btn-danger" (click)="onDelete(product.id)">DELETE</button></td>
          </tr>
          </tbody>
        </table>
        <br>
        <br>
        <form #productCreationForm="ngForm" (ngSubmit)="onSubmit(productCreationForm)">
          <div class="form-group">
            <label for="title">Product Title</label>
            <input name="title" type="text" class="form-control" id="title" #title_var="ngModel" ngModel required>
            <!-- <div *ngIf="!title_var.valid && title_var.touched"><p style="color: red; font-size: 10px">Please don't leave this empty!</p></div> -->
            <div [hidden]="title_var.valid || title_var.untouched" class="alert alert-danger">Please don't leave the value empty</div>
            <label for="count">Product Count</label>
            <input name="count" type="number" class="form-control" id="count" #count_var="ngModel" ngModel  required>
            <div *ngIf="!count_var.valid && count_var.touched"><p style="color: red; font-size: 10px">Please don't leave this empty!</p></div>
            <label for="price">Product Price</label>
            <input name="price" type="number" class="form-control" id="price" #price_var="ngModel" ngModel required>
            <div *ngIf="!price_var.valid && price_var.touched"><p style="color: red; font-size: 10px">Please don't leave this empty!</p></div>
          </div>
          <!-- <button (click)="formHandlingMethod($event)" type="submit" class="btn btn-primary">Submit</button> -->
          <button type="submit" [disabled]="productCreationForm.invalid" class="btn btn-primary">Submit</button>
        </form>
        <br>
        f.value  {{ productCreationForm.value | json }}<br>
        f.valid {{ productCreationForm.valid | json }}<br>
        f.submitted {{ productCreationForm.submitted | json }}<br>
        f.touched  {{ productCreationForm.touched | json }}<br>
        f.dirty {{ productCreationForm.dirty | json }}<br>

        <!-- {{ productCreationForm.value | json }} -->
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  filterValue: string;
  filteredProducts: IProduct[] = [];

  @ViewChild('productCreationForm') private productCreationForm: NgForm;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res;
        this.filteredProducts = this.products;
        // console.log(res);
      },
      err => console.log(err)
    );
  }

  performFilter(val: string): IProduct[] {
    this.filterValue = val;
    return this.products.filter((p: any) => p.title.toLocaleLowerCase().includes(val));
  }

  onFilter(val: string): void {
    this.filteredProducts = val ?
      this.performFilter(val) :
      this.products;
  }

  onDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      res => {
        this.products = this.filteredProducts.filter((p: IProduct) => p.id !== id)
        this.filteredProducts = this.products;
      },
      err => console.log(err),
    );
  }

  formHandlingMethod($event: MouseEvent): void {
    this.productService.createProduct(this.productCreationForm.value).subscribe(
      res => {
        this.productService.getProducts().subscribe(
          res2 => {
            this.products = res2;
            this.filterValue === undefined ? this.filteredProducts = res2 : null;
          },
          err => console.log(err)
        );
      },
      err => console.log(err),
    );
  }

  onSubmit(form: NgForm): void {
    if (this.productCreationForm.valid) {
      this.productService.createProduct(form.value).subscribe(
        res => {
          this.productService.getProducts().subscribe(
            res2 => {
              this.products = res2;
              this.filterValue === undefined ? this.filteredProducts = res2 : null;
            },
            err => console.log(err)
          );
        },
        err => console.log(err),
      );
    }

    this.productCreationForm.resetForm();
  }
}
