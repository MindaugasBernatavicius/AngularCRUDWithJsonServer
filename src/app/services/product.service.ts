import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/IProduct';

@Injectable({ providedIn: 'root' })
export class ProductService {

  url = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.url);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(this.url + '/' + id)
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.httpClient.delete<IProduct>(this.url + '/' + id);
  }
}
