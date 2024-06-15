import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit{
  contact: any;
  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void{ 
    this.contact = this.contactsService.getContact(this.route.snapshot.params['id']).subscribe(data => {
      this.contact = data;
      // debugger;
    });
  }
  // updateContact() {
  //   this.contactsService.updateContact(this.contact);
  //   this.navigateDetail();
  // }
  updateContact() {
    this.contactsService.updateContact(this.contact).subscribe(data =>{
      this.navigateToDetail();
    });
  }
  cancelChange(){
    // this.router.navigate(['/contacts']);
    this.navigateToDetail();
  }
  navigateToDetail(){
    this.router.navigate(['/contact', this.route.snapshot.params['id']]);
  }
}
