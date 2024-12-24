import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * CombinedDataService is responsible for fetching combined data related to contacts and their products.
 * It abstracts the HTTP communication logic, providing an easy way to retrieve data from a remote server.
 */
@Injectable({
  providedIn: 'root',
})
export class CombinedDataService {
  /**
   * Constructor for CombinedDataService.
   * Initializes the service with the HttpClient for making HTTP requests.
   *
   * @param {HttpClient} http Angular HttpClient for making HTTP requests.
   */
  constructor(
    private http: HttpClient
  ) {}

  //Es una accion que necesita obtener datos constante, debe ser observable
  getContactProducts(): Observable<any> {
    // URL endpoint for fetching combined data:

    // const url = 'https://amazing-store-v1-3.onrender.com/combined-data/contact-products';
    // const url = 'https://amazing-store-v2-0.onrender.com/combined-data/contact-products';//BUENO
    // const url = 'http://192.168.0.10:8080/combined-data/contact-products';
    const url = 'http://localhost:30030/combined-data/contact-products';
   
    // Headers configuration for the request
    const headers = new HttpHeaders();
    //.set('Authorization', 'Basic ' + btoa('demo:demo'))
    //.set('X-User', 'demo')
    //.set('X-Password', 'demo');

    // Making the GET request to fetch the combined data
    return this.http.get<any>(url, { headers });
  }
}
