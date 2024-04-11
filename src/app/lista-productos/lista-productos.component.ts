import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit  {
  productos: any[] = [];
  page = 1;
  itemsPerPage = 10;
  filtroBusqueda: string = '';
  filtroFamilia: string = '';
  familias: string[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();

  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      data => {
        console.log(data); // Aquí puedes ver los productos filtrados
        this.productos = data.filter(producto => producto.marca.toLowerCase() === 'dermacol' && producto.reference_padre === '0');
        this.obtenerFamilias();
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }



  obtenerFamilias(): void {
    this.familias = Array.from(new Set(this.productos.map(producto => producto.familia)));
  }

  filtrarProductos(): any[] {
    let productosFiltrados = this.productos;

    if (this.filtroBusqueda) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.nombre_producto.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        producto.reference.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
      );
    }

    if (this.filtroFamilia) {
      productosFiltrados = productosFiltrados.filter(producto => producto.familia === this.filtroFamilia);
    }

    return productosFiltrados;
  }

  onPageChange(page: number): void {
    this.page = page;
  }
}








// patatas fritas pa comer
// por que no????????
