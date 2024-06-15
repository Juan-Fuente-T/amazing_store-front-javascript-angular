import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any>{
    //es una accion que necesita obtener datos constante, debe ser observable
    // const url = 'https://amazing-store-1-2.onrender.com/contacts/getAll';
    // const url = 'https://amazing-store-v0-1.onrender.com/contacts/getAll';
    // const url = 'http://192.168.0.10:8080/contacts/getAll';
    const url = 'http://localhost:30030/contacts/getAll';
    const headers = new HttpHeaders();
    //.set('Authorization', 'Basic ' + btoa('demo:demo'))
    //.set('X-User', 'demo')
    //.set('X-Password', 'demo');
    return this.http.get<any>(url, {headers});
  }
  getContact(c_id: number): Observable<any>{
    // const url = 'https://amazing-store-1-2.onrender.com/contacts/get';
    // const url = 'https://amazing-store-v0-1.onrender.com/contacts/get';
    // const url = 'http://192.168.0.10:8080/contacts/get';
    const url = 'http://localhost:30030/contacts/get';
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json');
    const body = JSON.stringify({id: c_id});
    return this.http.post<any>(url, body, {headers});
  }

  // updateContact(contact: any){
  //   const url = 'http://localhost:30030/contacts/update';
  //   const headers = new HttpHeaders();
  //   const body = contact;
  //   this.http.put(url, body, {headers}).subscribe();
  // }
  updateContact(contact: any): Observable<any>{
    // const url = 'https://amazing-store-1-2.onrender.com/contacts/update';
    // const url = 'https://amazing-store-v0-1.onrender.com/contacts/update';
    // const url = 'http://192.168.0.10:8080/contacts/update';
    const url = 'http://localhost:30030/contacts/update';
    const headers = new HttpHeaders();
    const body = contact;
    return this.http.put(url, body, {headers});
  }
  newContact(contact: any): void{
    // const url = 'https://amazing-store-1-2.onrender.com/contacts/add';
    // const url = 'https://amazing-store-v0-1.onrender.com/contacts/add';
    // const url = 'http://192.168.0.10:8080/contacts/add';
    const url = 'http://localhost:30030/contacts/add';
    const headers = new HttpHeaders();
    const body = contact;
    //es una accion puntual, que se inicia aqui, puede ser subscribe
    this.http.post(url, body, {headers}).subscribe();
  }
  // newContact(contact: any): Observable<any>{
  //   const url = 'http://localhost:30030/contacts/add';
  //   const headers = new HttpHeaders();
  //   const body = contact;
  //   return this.http.post(url, body, {headers});
  // }

  deleteContact(id:number): void{
    // const url = 'https://amazing-store-1-2.onrender.com/contacts/delete';
    // const url = 'https://amazing-store-v0-1.onrender.com/contacts/delete';
    // const url = 'http://192.168.0.10:8080/contacts/delete';
    const url = 'http://localhost:30030/contacts/delete';
    const body = {id:id};
    const options = {
      body: body,
      header:  new HttpHeaders()
    };
    //es una accion puntual, puede ser subscribe
    this.http.delete(url, options).subscribe();
  }
}

