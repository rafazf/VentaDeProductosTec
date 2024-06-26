import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,inject } from '@angular/core';
import { RequestApiService } from '../../CORE/services/requestApi.service';
import { IProduct } from '../../CORE/interfaces/IProduct';
import { Observable } from 'rxjs';
import { SharedProductsService } from '../../CORE/services/sharedProducts.service';
@Component({
  selector: 'lista-productos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaProductosComponent {
  reqApi = inject(RequestApiService);
  products$: Observable<IProduct[]>;
  cartService = inject(SharedProductsService);
  isLoading:boolean=false;
  search:string=''
  constructor() {
    this.products$ = this.reqApi.getData('books?limit=5')
  }

  /**Agregar producto al carrito */
  addProduct(product: IProduct): void {
    this.cartService.addProduct(product);
    this.isLoading = false;
    this.search = '';
  }

}
