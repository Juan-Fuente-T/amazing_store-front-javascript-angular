import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})


export class ProductNewComponent {
    activeControl = new FormControl(); 
    name!: string;
    stock!: number;
    price!: string;
    active!: boolean;
    date_added!: Date;
    product_type!: string;
    contact_id!: number;

    constructor(
      private ProductService: ProductsService,
      private router: Router
    ){}
  
    ngOnInit(): void{
      this.activeControl.setValue(this.active);
    }
  
    newProduct(): void{
      const product = {
        name: this.name,
        stock: this.stock,
        price: parseFloat(this.price),
        active: this.active,
        date_added: this.date_added,
        product_type: this.product_type,
        contact_id: this.contact_id
      }
      console.log("NEWproductDATA: ",product);
      this.ProductService.newProduct(product);
      this.router.navigate(['/products']);
    }
  
    cancelInsert(){
      this.router.navigate(['/products']);
    }

    toggleActive() {;
      this.active =!this.active;
      }
}
