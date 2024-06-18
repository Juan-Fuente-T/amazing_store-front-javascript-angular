import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

/**
 * ProductUpdateComponent is responsible for updating product details.
 * Provides an interface for editing existing product information.
 */
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  /**
   * Current product being edited.
   */
  product: any;
  /**
   * Form control for toggling the active status of the product.
   */
  activeControl = new FormControl();

  /**
   * Constructor for ProductUpdateComponent.
   * Initializes the component with the service for product operations,
   * the route parameters for identifying the product to edit,
   * the router for navigation purposes, and the change detector for UI updates.
   *
   * @param {ProductsService} productsService Service to interact with products.
   * @param {ActivatedRoute} route Route parameters for accessing product ID.
   * @param {Router} router Angular router for navigating between pages.
   * @param {ChangeDetectorRef} cdr Change detector to manually trigger UI updates.
   */
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes.
   * Fetches the product details based on the route parameter and sets the initial state.
   */
  ngOnInit(): void {
    this.product = this.productsService
      .getProduct(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.product = data;
        this.activeControl.setValue(this.product.active);
        // debugger;
      });
  }
  /**
   * Method to update the product details.
   * Calls the service to update the product and navigates to the detail view upon success.
   */
  // updateProduct() {
  //   this.PrdctsService.updateContact(this.contact);
  //   this.navigateDetail();
  // }
  updateProduct(): void {
    // debugger;
    this.productsService.updateProduct(this.product).subscribe((data) => {
      this.navigateToDetail();
    });
  }
  /**
   * Method to cancel changes and navigate back to the product detail view.
   */
  cancelChange() {
    // this.router.navigate(['/products']);
    this.navigateToDetail();
  }
  /**
   * Navigates to the detailed view of the product.
   */
  navigateToDetail() {
    this.router.navigate(['/product', this.route.snapshot.params['id']]);
  }
  /**
   * Toggles the active status of the product.
   * Updates the local copy of the product and triggers UI updates.
   */
  toggleActive() {
    const activeCopy = { ...this.product };
    activeCopy.active = !activeCopy.active;
    this.product = activeCopy;
    this.cdr.detectChanges();
  }
}
