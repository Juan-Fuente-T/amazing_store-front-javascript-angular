import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * ProductsService handles CRUD operations for products.
 * It communicates with a backend API to fetch, add, update, and delete product data.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  /**
   * Retrieves all products from the server.
   * Returns an Observable of the product data.
   */
  getProducts(): Observable<any> {
    // const url = 'https://amazing-store-v1-2.onrender.com/products/getAll'; //RENDER.COM imagen v1.2
    const url = 'https://amazing-store-v2-0.onrender.com/products/getAll'; //RENDER.COM imagen 2.0
    // const url = 'http://192.168.0.15:30030/products/getAll'; //CONTENEDOR DOCKER LOCAL
    // const url = 'http://localhost:30030/products/getAll'; //LOCAL INTELLIJ
    const headers = new HttpHeaders();
    //.set('Authorization', 'Basic ' + btoa('demo:demo'))
    //.set('X-User', 'demo')
    //.set('X-Password', 'demo');
    return this.http.get<any>(url, { headers });
  }
  /**
   * Fetches a single product by its ID.
   * Returns an Observable of the product data.
   *
   * @param p_id The ID of the product to fetch.
   */
  getProduct(p_id: number): Observable<any> {
    // const url = 'https://amazing-store-v1-2.onrender.com/products/get';
    const url = 'https://amazing-store-v2-0.onrender.com/products/get';
    // const url = 'http://192.168.0.15:30030/products/get';
    // const url = 'http://localhost:30030/products/get';

    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify({ id: p_id });
    return this.http.post<any>(url, body, { headers });
  }

  /**
   * Updates a product on the server.
   * Returns an Observable of the updated product data.
   *
   * @param product The product data to update.
   */
  updateProduct(product: any): Observable<any> {
    // const url = 'https://amazing-store-v1-2.onrender.com/products/update';
    const url = 'https://amazing-store-v2-0.onrender.com/products/update';
    // const url = 'http://192.168.0.15:30030/products/update';
    // const url = 'http://localhost:30030/products/update';
    const headers = new HttpHeaders();
    const body = product;
    return this.http.put(url, body, { headers });
  }
  /**
   * Creates a new product on the server.
   * Does not return any value.
   *
   * @param product The product data to create.
   */
  newProduct(product: any): void {
    // const url = 'https://amazing-store-v1-2.onrender.com/products/add';
    const url = 'https://amazing-store-v2-0.onrender.com/products/add';
    // const url = 'http://192.168.0.15:30030/products/add';
    // const url = 'http://localhost:30030/products/add';
    const headers = new HttpHeaders();
    const body = product;
    this.http.post(url, body, { headers }).subscribe();
  }
  // newProduct(product: any): Observable<any>{
  //   const url = 'http://localhost:30030/products/add';
  //   const headers = new HttpHeaders();
  //   const body = product;
  //   return this.http.post(url, body, {headers});
  // }
  /**
   * Deletes a product from the server by its ID.
   * Does not return any value.
   *
   * @param id The ID of the product to delete.
   */
  deleteProduct(id: number): void {
    // const url = 'https://amazing-store-v1-2.onrender.com/products/delete';
    const url = 'https://amazing-store-v2-0.onrender.com/products/delete';
    // const url = 'http://192.168.0.15:30030/products/delete';
    // const url = 'http://localhost:30030/products/delete';
    const body = { id: id };
    const options = {
      body: body,
      header: new HttpHeaders(),
    };
    this.http.delete(url, options).subscribe();
  }
}
