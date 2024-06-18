import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  active: boolean;
  product_type: string;
  date_added: string; // Date might be in string format
}
/**
 * ProductHomeComponent displays a list of products with options to view details, delete, or edit each product.
 * It also categorizes products by type and assigns colors to each category for better visualization.
 */
@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent {
  /**
   * List of products fetched from the service.
   */
  // dataSource: any = [];
  dataSource: Product[] = [];
  /**
   * Maps product types to colors for easy identification of categories.
   */
  productTypeColors: Map<string, string> = new Map();
  /**
   * Total number of unique product types.
   */
  totalTypes: number = 0;

  /**
   * Constructor for ProductHomeComponent.
   * Initializes the component with the service for interacting with products,
   * the router for navigation, and the dialog service for opening dialogs.
   *
   * @param {ProductsService} productsService Service to interact with products.
   * @param {Router} router Angular router for navigating between pages.
   * @param {MatDialog} dialog Material dialog service for opening dialogs.
   */
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo

  /**
   * Lifecycle hook that runs when the component initializes.
   * Fetches the list of products, sorts them, calculates the total number of unique product types,
   * and assigns colors to each product type based on its position in the sorted list.
   */ ngOnInit() {
    // this.productsService.getProducts().subscribe(data => {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      if (Array.isArray(data)) {
        // Ordenar productos
        this.dataSource = data.sort((a, b) => {
          const productTypeComparison = a.product_type.localeCompare(
            b.product_type
          );
          if (productTypeComparison !== 0) {
            return productTypeComparison;
          }
          return a.name.localeCompare(b.name);
        });

        // Obtener todos los tipos de productos únicos
        const uniqueProductTypes = Array.from(
          new Set(this.dataSource.map((product) => product.product_type))
        );

        // Calcular el número total de tipos de productos
        this.totalTypes = uniqueProductTypes.length;

        // Crear un mapa de tipo de producto a color
        this.productTypeColors = new Map();
        uniqueProductTypes.forEach((type, index) => {
          const color = this.getColorGradient(index, this.totalTypes);
          this.productTypeColors.set(type, color);
        });
      }
    });
  }
  /**
   * Opens the detail view for a specific product.
   *
   * @param {any} row Product data.
   */
  openDetailForm(row: any) {
    this.router.navigate(['/product', row.id]);
  }
  /**
   * Opens a dialog to delete a specific product.
   *
   * @param {number} productId ID of the product to delete.
   */
  openDeleteDialog(productId: number): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: { productId: productId },
    });
  }
  /**
   * Navigates to the edit page for a specific product.
   *
   * @param {any} productId ID of the product to edit.
   */
  editProductDetail(productId: any) {
    this.router.navigate(['/product/edit', productId]);
  }
  /**
   * Generates a gradient color based on the index of the product type.
   * This is used to assign different colors to each product type for better visualization.
   *
   * @param {number} index Index of the product type in the sorted list.
   * @param {number} totalTypes Total number of unique product types.
   * @returns {string} CSS color code for the gradient.
   */
  getColorGradient(index: number, totalTypes: number): string {
    const baseLightness = 90; // Base ligera
    const lightnessStep = 4; // Pequeños saltos en la intensidad
    const lightness = baseLightness - index * lightnessStep;
    return `hsl(262, 52%, ${lightness}%)`;
  }

  // getColorGradient(index: number, totalTypes: number): string {
  //   const lightness = 77 + (index / totalTypes) * 0; // Varia la intensidad de 50% a 90%
  //   return `hsl(262, 52%, ${lightness}%)`; // Mantiene el matiz (hue) en verde (120)
  // }
}
