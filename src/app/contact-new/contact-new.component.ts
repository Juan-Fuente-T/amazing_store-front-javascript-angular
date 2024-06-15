import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

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


  constructor(
    private contactService: ContactsService,
    private router: Router
  ){}

  ngOnInit(): void{
  }

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

  cancelInsert(){
    this.router.navigate(['/contacts']);
  }
}
