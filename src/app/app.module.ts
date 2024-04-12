import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarrouselComponent } from './carrousel/carrousel.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    HeaderComponent,
    CarrouselComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    SlickCarouselModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


