import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/IProduct';

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
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res;
        this.filteredProducts = this.products;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  performFilter(val: string): IProduct[] {
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
}
