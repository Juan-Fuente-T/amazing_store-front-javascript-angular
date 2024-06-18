import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * ProductDetailComponent displays detailed information about a single product.
 * Allows editing the product and provides options to delete the product via a dialog.
 */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  /**
   * Object holding the product details fetched from the service.
   */
  product: any = {};
  /**
   * Constructor for ProductDetailComponent.
   * Initializes the component with the service for product operations,
   * the route parameters for accessing product ID, the router for navigation,
   * and the dialog service for opening dialogs.
   *
   * @param {ProductsService} productsService Service to interact with products.
   * @param {ActivatedRoute} route Route parameters for accessing product ID.
   * @param {Router} router Angular router for navigating between pages.
   * @param {MatDialog} dialog Dialog service for opening dialogs.
   */
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo

  /**
   * Lifecycle hook that runs when the component initializes.
   * Fetches the product details based on the product ID from the route parameters.
   */
  ngOnInit(): void {
    this.product = this.productsService
      .getProduct(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.product = data;
      });
  }
  /**
   * Navigates to the edit page for the current product.
   */
  editProduct() {
    this.router.navigate(['/product/edit', this.route.snapshot.params['id']]);
  }
  /**
   * Closes the detail view and navigates back to the main products list.
   */
  closeProduct() {
    this.router.navigate(['/products']);
  }
  /**
   * Opens a dialog for deleting the current product.
   *
   * @param {number} productId ID of the product to be deleted.
   */
  openDeleteDialog(productId: number): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: { productId: productId },
    });
  }
}
