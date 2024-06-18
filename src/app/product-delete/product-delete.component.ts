import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * ProductDeleteComponent is responsible for deleting a product.
 * It provides a dialog interface for confirming the deletion of a product.
 */
@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent {
  /**
   * ID of the product to be deleted.
   */
  productId: number;
  /**
   * Constructor for ProductDeleteComponent.
   * Initializes the component with the service for product operations,
   * the dialog reference, the data passed to the dialog (which includes the product ID),
   * and the router for navigation purposes.
   *
   * @param {ProductsService} productService Service to interact with products.
   * @param {MatDialogRef} dialogRef Reference to the current dialog.
   * @param {MAT_DIALOG_DATA} data Data injected into the dialog, including the product ID.
   * @param {Router} router Angular router for navigating after deletion.
   */
  constructor(
    private productService: ProductsService,
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      productId: number;
    },
    private router: Router
  ) {
    this.productId = data.productId;
  }
  /**
   * Lifecycle hook that runs when the component initializes.
   * Currently empty but reserved for future use.
   */
  ngOnInit(): void {}
  /**
   * Method called when the confirmation button is clicked.
   * Deletes the product using the product service, closes the dialog,
   * and navigates back to the products page.
   */
  confirm(): void {
    this.productService.deleteProduct(this.productId);
    this.dialogRef.close();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products']);
    });
  }
}
