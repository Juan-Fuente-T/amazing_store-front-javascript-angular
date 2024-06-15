import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {

  productId: number;

  constructor(
    private productService: ProductsService,
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      productId: number
    },
    private router: Router
  ){
    this.productId = data.productId;
  }

  ngOnInit(): void{}

  confirm(): void{
    this.productService.deleteProduct(this.productId);
    this.dialogRef.close();
    this.router.navigateByUrl('/',{skipLocationChange: true}).then(() => {
    this.router.navigate(['/products'])
    });
  }
}
