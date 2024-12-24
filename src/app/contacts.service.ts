import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * ContactsService provides methods for interacting with contacts data via HTTP requests.
 * It includes functionalities for retrieving, updating, adding, and deleting contacts.
 */
@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves all contacts from the server.
   * Returns an Observable of the contacts data.
   */
  getContacts(): Observable<any> {
    //es una accion que necesita obtener datos constante, debe ser observable
    // const url = 'https://amazing-store-v1-2.onrender.com/contacts/getAll';
    // const url = 'https://amazing-store-v2-0.onrender.com/contacts/getAll';//BUENO
    // const url = 'http://192.168.0.15:30030/contacts/getAll';
    const url = 'http://localhost:30030/contacts/getAll';
    const headers = new HttpHeaders();
    //.set('Authorization', 'Basic ' + btoa('demo:demo'))
    //.set('X-User', 'demo')
    //.set('X-Password', 'demo');
    return this.http.get<any>(url, { headers });
  }
  /**
   * Retrieves a single contact by its ID from the server.
   * Returns an Observable of the contact data.
   * @param c_id The ID of the contact to retrieve.
   */

  getContact(c_id: number): Observable<any> {
    // const url = 'https://amazing-store-v1-2.onrender.com/contacts/get';
    // const url = 'https://amazing-store-v2-0.onrender.com/contacts/get';//BUENO
    // const url = 'http://192.168.0.15:30030/contacts/get';
    const url = 'http://localhost:30030/contacts/get';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify({ id: c_id });
    return this.http.post<any>(url, body, { headers });
  }

  /**
   * Updates a contact on the server with the provided data.
   * Returns an Observable of the updated contact data.
   * @param contact The contact data to update.
   */
  // updateContact(contact: any){
  //   const url = 'http://localhost:30030/contacts/update';
  //   const headers = new HttpHeaders();
  //   const body = contact;
  //   this.http.put(url, body, {headers}).subscribe();
  // }

  updateContact(contact: any): Observable<any> {
    // const url = 'https://amazing-store-v1-2.onrender.com/contacts/update';
    // const url = 'https://amazing-store-v2-0.onrender.com/contacts/update';//BUENO
    // const url = 'http://192.168.0.15:30030/contacts/update';
    const url = 'http://localhost:30030/contacts/update';
    const headers = new HttpHeaders();
    const body = contact;
    return this.http.put(url, body, { headers });
  }
  /**
   * Creates a new contact on the server with the provided data.
   * Does not return any value since it performs a side effect operation.
   * @param contact The contact data to add.
   */
  newContact(contact: any): void {
    // const url = 'https://amazing-store-v1-2.onrender.com/contacts/add';
    // const url = 'https://amazing-store-v2-0.onrender.com/contacts/add';//BUENO
    // const url = 'http://192.168.0.15:30030/contacts/add';
    const url = 'http://localhost:30030/contacts/add';
    const headers = new HttpHeaders();
    const body = contact;
    //es una accion puntual, que se inicia aqui, puede ser subscribe
    this.http.post(url, body, { headers }).subscribe();
  }
  // newContact(contact: any): Observable<any>{
  //   const url = 'http://localhost:30030/contacts/add';
  //   const headers = new HttpHeaders();
  //   const body = contact;
  //   return this.http.post(url, body, {headers});
  // }
  /**
   * Deletes a contact from the server by its ID.
   * Performs a side effect operation and does not return any value.
   * @param id The ID of the contact to delete.
   */
  deleteContact(id: number): void {
    // const url = 'https://amazing-store-v1-2.onrender.com/contacts/delete';
    // const url = 'https://amazing-store-v2-0.onrender.com/contacts/delete';//BUENO
    // const url = 'http://192.168.0.15:30030/contacts/delete';
    const url = 'http://localhost:30030/contacts/delete';
    //
    const body = { id: id };
    const options = {
      body: body,
      header: new HttpHeaders(),
    };
    //es una accion puntual, puede ser subscribe
    this.http.delete(url, options).subscribe();
  }
}
