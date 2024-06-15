import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{
  product: any;
  activeControl = new FormControl(); 
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void{ 
    this.product = this.productsService.getProduct(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data;
      this.activeControl.setValue(this.product.active);
      // debugger;
    });
  }
  // updateProduct() {
  //   this.PrdctsService.updateContact(this.contact);
  //   this.navigateDetail();
  // }
  updateProduct(): void {
    // debugger;
    this.productsService.updateProduct(this.product).subscribe(data =>{
      this.navigateToDetail();
    });
  }
  cancelChange(){
    // this.router.navigate(['/products']);
    this.navigateToDetail();
  }
  navigateToDetail(){
    this.router.navigate(['/product', this.route.snapshot.params['id']]);
  }
  toggleActive() {
  const activeCopy = {...this.product};
  activeCopy.active =!activeCopy.active;
  this.product = activeCopy;
  this.cdr.detectChanges();
  }
  
}

