import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent {
  dataSource: any = [];
  constructor(
    private contactService: ContactsService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo
  ngOnInit(){
    this.contactService.getContacts().subscribe(data => {
      if(Array.isArray(data)){
        this.dataSource = data;
        // debugger;
      }
    })
  }
  openDetailForm(row: any){
    this.router.navigate(['/contact', row.id]);
  }
  openDeleteDialog(contactId: number): void{
    const dialogRef = this.dialog.open(ContactDeleteComponent, {data: {contactId: contactId}})
  }
  editContactDetail(contactId: any){
    this.router.navigate(['/contact/edit', contactId]);
  }
}
//   openDeleteDialog(contactId: number): void{
//     const dialogRef = this.dialog.open(ContactDeleteComponent, {data: {contactId: contactId}, height: '400px',
//     width: '600px',})
//   }
// }
