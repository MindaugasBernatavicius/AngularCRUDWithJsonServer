import { Injectable } from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/IProduct';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(this.url, product);
  }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.url);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(this.url + '/' + id);
  }

  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(this.url + '/' + id, product);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.httpClient.delete<IProduct>(this.url + '/' + id);
  }
}
