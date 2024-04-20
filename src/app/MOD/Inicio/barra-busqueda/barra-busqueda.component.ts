import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../interfaces/IProduct';
import { SharedProductsService } from '../services/sharedProducts.service';
import { RequestApiService } from '../services/requestApi.service';
@Component({
  selector: 'barra-busqueda',
  standalone: true,
  imports: [
    CommonModule,FormsModule
  ],
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarraBusquedaComponent {
  search:string='';
  isLoading:boolean=false;
  dataSearch$: IProduct[]=[];
  cartService = inject(SharedProductsService);
  reqApi = inject(RequestApiService)

  /**Buscar un producto en la barra de busqueda y agregar al carrito */
  searchAdd(searchValue: any): any {
    this.isLoading = true;
    if(searchValue !== ''){
      const urlSearch = `laptops?search=${searchValue}`;
      this.reqApi.getData(urlSearch).subscribe( (res :IProduct[]) => {
        if (res.length === 0) {
          this.isLoading = false;
        } else {
          this.dataSearch$ = res;
        }
      })
    }else{
      this.isLoading=false;
    }
  }

  /**Agregar producto al carrito */
  addProduct(product: IProduct): void {
    this.cartService.addProduct(product);
    this.isLoading = false;
    this.search = '';
  }
}
