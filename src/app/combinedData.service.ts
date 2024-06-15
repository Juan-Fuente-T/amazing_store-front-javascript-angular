import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CombinedDataService {

  constructor(private http: HttpClient) { }

  getContactProducts(): Observable<any>{
    //es una accion que necesita obtener datos constante, debe ser observable
    // const url = 'https://amazing-store-1-2.onrender.com/contacts/getAll';
    // const url = 'https://amazing-store-v0-1.onrender.com/contacts/getAll';
    // const url = 'http://192.168.0.10:8080/contacts/getAll';
    const url = 'http://localhost:30030/combined-data/contact-products';
    const headers = new HttpHeaders();
    //.set('Authorization', 'Basic ' + btoa('demo:demo'))
    //.set('X-User', 'demo')
    //.set('X-Password', 'demo');
    return this.http.get<any>(url, {headers});
  }
}