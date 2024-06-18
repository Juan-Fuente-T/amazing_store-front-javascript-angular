import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';

/**
 * ContactHomeComponent displays a list of contacts and allows actions such as editing details, viewing details, and deleting contacts.
 */
@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent {
   /**
   * Data source for displaying contacts in the table.
   */
  dataSource: any = [];
   /**
   * Constructor for ContactHomeComponent.
   * Initializes the component with the service for contacting operations,
   * the router for navigation purposes, and the dialog for opening dialogs.
   * 
   * @param {ContactsService} contactService Service to interact with contacts.
   * @param {Router} router Angular router for navigating between pages.
   * @param {MatDialog} dialog Dialog service for opening dialogs.
   */
  constructor(
    private contactService: ContactsService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo
  
  /**
   * Lifecycle hook that initializes the component.
   * Fetches the list of contacts from the service and assigns it to the data source.
   */
  ngOnInit(){
    this.contactService.getContacts().subscribe(data => {
      if(Array.isArray(data)){
        this.dataSource = data;
        // debugger;
      }
    })
  }
   /**
   * Navigates to the detail view of a contact.
   * 
   * @param {any} row Contact object containing the id of the contact.
   */
  openDetailForm(row: any){
    this.router.navigate(['/contact', row.id]);
  }
   /**
   * Opens a dialog for deleting a contact.
   * 
   * @param {number} contactId ID of the contact to delete.
   */
  openDeleteDialog(contactId: number): void{
    const dialogRef = this.dialog.open(ContactDeleteComponent, {data: {contactId: contactId}})
  }
   /**
   * Navigates to the edit page of a contact.
   * 
   * @param {any} contactId ID of the contact to edit.
   */
  editContactDetail(contactId: any){
    this.router.navigate(['/contact/edit', contactId]);
  }
}
//   openDeleteDialog(contactId: number): void{
//     const dialogRef = this.dialog.open(ContactDeleteComponent, {data: {contactId: contactId}, height: '400px',
//     width: '600px',})
//   }
// }
