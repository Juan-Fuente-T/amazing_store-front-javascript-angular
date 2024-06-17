export const environment = {
    production: false,
    // apiUrl: 'http://amazing-store-v0-1.onrender.com'
    apiUrl: 'http://localhost:30030'
  };
//   import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductsService {

//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) { }

//   getProducts(): Observable<any> {
//     const url = `${this.apiUrl}/products/getAll`;
//     const headers = new HttpHeaders();
//     return this.http.get<any>(url, { headers });
//   }

//   getProduct(c_id: number): Observable<any> {
//     const url = `${this.apiUrl}/products/get`;
//     const headers = new HttpHeaders()
//       .set('Content-type', 'application/json');
//     const body = JSON.stringify({ id: c_id });
//     return this.http.post<any>(url, body, { headers });
//   }

//   updateProduct(product: any): Observable<any> {
//     const url = `${this.apiUrl}/products/update`;
//     const headers = new HttpHeaders();
//     const body = product;
//     return this.http.put(url, body, { headers });
//   }

//   newProduct(product: any): void {
//     const url = `${this.apiUrl}/products/add`;
//     const headers = new HttpHeaders();
//     const body = product;
//     this.http.post(url, body, { headers }).subscribe();
//   }

//   deleteProduct(id: number): void {
//     const url = `${this.apiUrl}/products/delete`;
//     const body = { id: id };
//     const options = {
//       body: body,
//       header: new HttpHeaders()
//     };
//     this.http.delete(url, options).subscribe();
//   }
// }
