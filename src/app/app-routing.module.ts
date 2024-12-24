import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHomeComponent } from './contact-home/contact-home.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path: '', component: ChartsComponent, canActivate: [authGuard]},
  {path: 'contacts', component: ContactHomeComponent, canActivate: [authGuard]},
  {path: 'products', component: ProductHomeComponent, canActivate: [authGuard]},
  {path: 'contact/new', component: ContactNewComponent, canActivate: [authGuard]},
  {path: 'product/new', component: ProductNewComponent, canActivate: [authGuard]},
  {path: 'contact/:id', component: ContactDetailComponent, canActivate: [authGuard]},
  {path: 'product/:id', component: ProductDetailComponent, canActivate: [authGuard]},
  {path: 'contact/edit/:id', component: ContactUpdateComponent, canActivate: [authGuard]},
  {path: 'product/edit/:id', component: ProductUpdateComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent} // Esta ruta no necesita el guard
];

/**
 * AppRoutingModule defines the application's routing configuration.
 * It maps URL paths to components, enabling navigation between different views within the app.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
