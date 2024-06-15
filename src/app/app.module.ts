import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactHomeComponent } from './contact-home/contact-home.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { FormsModule } from '@angular/forms';
import { ProductUpdateComponent } from './product-update/product-update.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ChartsComponent } from './charts/charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    ContactHomeComponent,
    ProductHomeComponent,
    ContactDetailComponent,
    ProductDetailComponent,
    ContactUpdateComponent,
    ProductUpdateComponent,
    ContactNewComponent,
    ProductNewComponent,
    ContactDeleteComponent,
    ProductDeleteComponent,
    ChartsComponent
  ],
  entryComponents:[ContactDeleteComponent],//indica que se abre por encima del resto
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    NgxChartsModule
  ],
  providers: [
  {
    provide: LOCALE_ID,
    useValue: 'es-ES',
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
