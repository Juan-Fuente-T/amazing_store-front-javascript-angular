import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

/**
 * ContactNewComponent is responsible for creating a new contact.
 * Provides a form interface for entering contact details and submitting a new contact.
 */
@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})

export class ContactNewComponent {
  name!: string;
  surname!: string;
  lastname!:string;
  telephone!: string;
  city!: string;
  email!: string;
  product_type!: string;


  /**
   * Constructor for ContactNewComponent.
   * Initializes the component with the service for contacting operations and the router for navigation purposes.
   * 
   * @param {ContactsService} contactService Service to interact with contacts.
   * @param {Router} router Angular router for navigating between pages.
   */
  constructor(
    private contactService: ContactsService,
    private router: Router
  ){}

  /**
   * Lifecycle hook that runs when the component initializes.
   * Currently empty but reserved for future use.
   */
  ngOnInit(): void{
  }
/**
   * Method to create a new contact.
   * Constructs a contact object with the provided details and submits it through the contact service.
   * Then navigates back to the contacts page.
   */
  newContact(): void{
    const contact = {
      name: this.name,
      surname: this.surname,
      lastname: this.lastname,
      telephone: this.telephone,
      city: this.city,
      email: this.email,
      product_type: this.product_type
    }
    this.contactService.newContact(contact);
    this.router.navigate(['/contacts']);
  }
 /**
   * Method to cancel the insertion process.
   * Navigates back to the contacts page without saving the new contact.
   */
  cancelInsert(){
    this.router.navigate(['/contacts']);
  }
}
