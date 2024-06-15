import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any = {};
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo
  ngOnInit(): void{ 
    this.product = this.productsService.getProduct(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data;
      // debugger;
    })
 }
 editProduct(){
  this.router.navigate(['/product/edit', this.route.snapshot.params['id']]);
}
closeProduct(){
  this.router.navigate(['/products']);
}
openDeleteDialog(productId: number):void{
  const dialogRef = this.dialog.open(ProductDeleteComponent, {data: {productId: productId}})
}
}
