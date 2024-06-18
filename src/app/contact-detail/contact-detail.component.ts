import { Component, Inject, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

/**
 * ContactDetailComponent displays detailed information about a single contact.
 * It allows editing the contact details and provides options to delete the contact through a dialog.
 */
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  /**
   * Object holding the contact details.
   */
  contact: any = {};

  /**
   * Constructor for ContactDetailComponent.
   * Initializes the component with the service for contacting operations,
   * the route parameters for accessing the current contact ID,
   * the router for navigation purposes, and the dialog service for opening dialogs.
   *
   * @param {ContactsService} contactsService Service to interact with contacts.
   * @param {ActivatedRoute} route Route parameters for accessing the current contact ID.
   * @param {Router} router Angular router for navigating between pages.
   * @param {MatDialog} dialog Dialog service for opening dialogs.
   */
  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo

  /**
   * Lifecycle hook that initializes the component.
   * Fetches the contact details using the contact ID from the route parameters.
   */
  ngOnInit(): void {
    this.contactsService
      .getContact(this.route.snapshot.params['id'])
      .subscribe((data) => {
        // data? this.contact = data: this.contact = ""; //si data es true, se asigna el valor de data a contact, sino se asigna un string vacio
        this.contact = data;
      });
  }
  /**
   * Navigates to the edit page for the current contact.
   */
  editContact() {
    this.router.navigate(['/contact/edit', this.route.snapshot.params['id']]);
  }
  /**
   * Closes the detail view and navigates back to the contacts list.
   */
  closeContact() {
    this.router.navigate(['/contacts']);
  }
  /**
   * Opens a dialog for deleting the current contact.
   *
   * @param {number} contactId ID of the contact to be deleted.
   */
  openDeleteDialog(contactId: number): void {
    const dialogRef = this.dialog.open(ContactDeleteComponent, {
      data: { contactId: contactId },
    });
  }
}
