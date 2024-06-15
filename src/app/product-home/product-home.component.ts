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

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent {
  // dataSource: any = [];
  dataSource: Product[] = [];
  productTypeColors: Map<string, string> = new Map();
  totalTypes: number = 0;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private dialog: MatDialog) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo
  ngOnInit(){
    // this.productsService.getProducts().subscribe(data => {
    this.productsService.getProducts().subscribe((data: Product[]) => {
    if (Array.isArray(data)) {
        // Ordenar productos
        this.dataSource = data.sort((a, b) => {
          const productTypeComparison = a.product_type.localeCompare(b.product_type);
          if (productTypeComparison !== 0) {
            return productTypeComparison;
          }
          return a.name.localeCompare(b.name);
        });

        // Obtener todos los tipos de productos únicos
        const uniqueProductTypes = Array.from(new Set(this.dataSource.map(product => product.product_type)));

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
  
  openDetailForm(row: any){
    this.router.navigate(['/product', row.id]);
  }
  openDeleteDialog(productId: number): void{
    const dialogRef = this.dialog.open(ProductDeleteComponent, {data: {productId: productId}})
  }
  editProductDetail(productId: any){
    this.router.navigate(['/product/edit', productId]);
  }
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
