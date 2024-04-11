import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any[]> {
    // Realizar una consulta para obtener datos de la tabla producto
    const productos$ = this.http.get<any[]>('https://pruebatest.trendingcorporate.com/connector1.php');

    // Realizar una consulta para obtener datos de la tabla product_erp
    const productosErp$ = this.http.get<any[]>('https://pruebatest.trendingcorporate.com/connector1.php');

    // Combinar los resultados de las dos consultas
    return forkJoin([productos$, productosErp$]).pipe(
      map(([productos, productosErp]) => {
        // Mapear los productos obtenidos para incluir el stock
        return productos.map(producto => {
          const productoErp = productosErp.find(p => p.reference === producto.reference);
          return { ...producto, stock: productoErp ? productoErp.stock : null };
        });
      })
    );
  }
  
  getCategorias(): Observable<{ categoria: string; subcategorias: string[] }[]> {
    return this.obtenerProductos().pipe(
      map((productos: any[]) => {
        const categoriasMap = new Map<string, Set<string>>();
        productos.forEach(producto => {
          const categoria = producto.categoria;
          const subcategoria = producto.subcategoria;
          if (!categoriasMap.has(categoria)) {
            categoriasMap.set(categoria, new Set<string>());
          }
          categoriasMap.get(categoria)?.add(subcategoria);
        });

        const categorias: { categoria: string; subcategorias: string[] }[] = [];
        categoriasMap.forEach((subcategorias, categoria) => {
          categorias.push({ categoria, subcategorias: Array.from(subcategorias) });
        });

        return categorias;
      })
    );
  }
}



