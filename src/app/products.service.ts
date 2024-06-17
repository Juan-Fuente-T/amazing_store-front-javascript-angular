import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    // const url = 'https://amazing-store-v1-3.onrender.com/products/getAll';
    // const url = 'http://192.168.0.10:8080/products/getAll';
    const url = 'http://localhost:30030/products/getAll';
    const headers = new HttpHeaders();
    //.set('Authorization', 'Basic ' + btoa('demo:demo'))
    //.set('X-User', 'demo')
    //.set('X-Password', 'demo');
    return this.http.get<any>(url, {headers});
  }

  getProduct(p_id: number): Observable<any>{
    // const url = 'https://amazing-store-v1-3.onrender.com/products/get';
    // const url = 'http://192.168.0.10:8080/products/get';
    const url = 'http://localhost:30030/products/get';
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json');
    const body = JSON.stringify({id: p_id});
    return this.http.post<any>(url, body, {headers});
  }

  updateProduct(product: any): Observable<any>{
    // const url = 'https://amazing-store-v1-3.onrender.com/products/update';
    // const url = 'http://192.168.0.10:8080/products/update';
    const url = 'http://localhost:30030/products/update';
    const headers = new HttpHeaders();
    const body = product;
    return this.http.put(url, body, {headers});
  }
  newProduct(product: any): void{
    // const url = 'https://amazing-store-v1-3.onrender.com/products/add';
    // const url = 'http://192.168.0.10:8080/products/add';
    const url = 'http://localhost:30030/products/add';
    const headers = new HttpHeaders();
    const body = product;
    this.http.post(url, body, {headers}).subscribe();
  }
  // newProduct(product: any): Observable<any>{
  //   const url = 'http://localhost:30030/products/add';
  //   const headers = new HttpHeaders();
  //   const body = product;
  //   return this.http.post(url, body, {headers});
  // }

  deleteProduct(id: number): void{
    // const url = 'https://amazing-store-v1-3.onrender.com/products/delete';
    // const url = 'http://192.168.0.10:8080/products/delete';
    const url = 'http://localhost:30030/products/delete';
    const body = {id:id};
    const options = {
      body: body,
      header:  new HttpHeaders()
    };
    this.http.delete(url, options).subscribe();
  }
}

