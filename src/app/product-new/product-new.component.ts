import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';

/**
 * ProductNewComponent is responsible for creating a new product.
 * Provides a form interface for entering product details and submitting a new product.
 */
@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent {
  /**
   * Form control for toggling the active status of the product.
   */
  activeControl = new FormControl();
  name!: string;
  stock!: number;
  price!: string;
  active!: boolean;
  date_added!: Date;
  product_type!: string;
  contact_id!: number;

  /**
   * Constructor for ProductNewComponent.
   * Initializes the component with the service for product operations and the router for navigation purposes.
   *
   * @param {ProductsService} productService Service to interact with products.
   * @param {Router} router Angular router for navigating between pages.
   */
  constructor(
    private ProductService: ProductsService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes.
   * Sets the initial value of the active control based on the active property.
   */
  ngOnInit(): void {
    this.activeControl.setValue(this.active);
  }

  /**
   * Method to create a new product.
   * Constructs a product object with the provided details and submits it through the product service.
   * Then navigates back to the products page.
   */
  newProduct(): void {
    const product = {
      name: this.name,
      stock: this.stock,
      price: parseFloat(this.price),
      active: this.active,
      date_added: this.date_added,
      product_type: this.product_type,
      contact_id: this.contact_id,
    };
    this.ProductService.newProduct(product);
    this.router.navigate(['/products']);
  }
  /**
   * Method to cancel the insertion process.
   * Navigates back to the products page without saving the new product.
   */
  cancelInsert() {
    this.router.navigate(['/products']);
  }
  /**
   * Toggles the active status of the product.
   * Used to enable/disable the product in the UI.
   */
  toggleActive() {
    this.active = !this.active;
  }
}
