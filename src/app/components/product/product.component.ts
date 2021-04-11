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
        <ul class="list-group">
          <li class="list-group-item">Product id: <b>{{ product.id }}</b></li>
          <li class="list-group-item">Product title: <b>{{ product.title }}</b></li>
          <li class="list-group-item">Product count: <b>{{ product.count }}</b></li>
          <li class="list-group-item">Product price: <b>{{ product.price }}</b></li>
          <!-- <li class="list-group-item">Product rating: <b>{{ product.rating }}</b></li> -->
        </ul>
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

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
    this.router.navigate(['/products'])
  }
}
