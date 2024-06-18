import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

/**
 * ContactUpdateComponent is responsible for updating existing contacts.
 * Provides a form interface for editing contact details and submitting the updated contact.
 */
@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit{
   /**
   * Object holding the contact data to be updated.
   */
  contact: any;
  /**
   * Constructor for ContactUpdateComponent.
   * Initializes the component with the service for contacting operations,
   * the route parameters for identifying the contact to update,
   * and the router for navigation purposes.
   * 
   * @param {ContactsService} contactsService Service to interact with contacts.
   * @param {ActivatedRoute} route Route parameters for accessing the contact ID.
   * @param {Router} router Angular router for navigating between pages.
   */
  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
/**
   * Lifecycle hook that runs when the component initializes.
   * Fetches the contact data based on the route parameter and assigns it to the component.
   */
  ngOnInit(): void{ 
    this.contact = this.contactsService.getContact(this.route.snapshot.params['id']).subscribe(data => {
      this.contact = data;
      // debugger;
    });
  }

  /**
   * Method to update the contact.
   * Calls the service to update the contact with the current data and navigates to the detail view of the updated contact.
   */
  // updateContact() {
  //   this.contactsService.updateContact(this.contact);
  //   this.navigateDetail();
  // }
  updateContact() {
    this.contactsService.updateContact(this.contact).subscribe(data =>{
      this.navigateToDetail();
    });
  }
   /**
   * Method to cancel changes and navigate back to the contact list.
   * Optionally, could redirect to another relevant page instead of the contact list.
   */
  cancelChange(){
    // this.router.navigate(['/contacts']);
    this.navigateToDetail();
  }
   /**
   * Helper method to navigate to the detailed view of the contact.
   * Uses the contact ID from the route parameters to construct the URL.
   */
  navigateToDetail(){
    this.router.navigate(['/contact', this.route.snapshot.params['id']]);
  }
}
