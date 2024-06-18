import { Component, Inject } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * ContactDeleteComponent component is responsible for deleting a contact.
 * It provides a dialog interface for confirming the deletion of a contact.
 */
@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
 /**
   * ID of the contact to be deleted.
   */
export class ContactDeleteComponent {
  contactId: number;

  /**
   * Constructor for ContactDeleteComponent.
   * Initializes the component with the service for contacting operations,
   * the dialog reference, the data passed to the dialog (which includes the contact ID),
   * and the router for navigation purposes.
   * 
   * @param {ContactsService} contactService Service to interact with contacts.
   * @param {MatDialogRef} dialogRef Reference to the current dialog.
   * @param {MAT_DIALOG_DATA} data Data injected into the dialog, including the contact ID.
   * @param {Router} router Angular router for navigating after deletion.
   */
  constructor(
    private contactService: ContactsService,
    public dialogRef: MatDialogRef<ContactDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contactId: number
    },
    private router: Router
  ){
    this.contactId = data.contactId;
  }
 /**
   * Placeholder method for lifecycle hook initialization.
   * Currently empty but reserved for future use.
   */
  noOnInit(): void{}
  /**
   * Method called when the confirmation button is clicked.
   * Deletes the contact using the contact service, closes the dialog,
   * and navigates back to the contacts page.
   */
  confirm(): void{
    this.contactService.deleteContact(this.contactId);
    this.dialogRef.close();
    this.router.navigateByUrl('/',{skipLocationChange: true}).then(() => {
    this.router.navigate(['/contacts'])
    });
  }

}
