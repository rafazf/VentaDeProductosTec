import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,inject } from '@angular/core';
import { RequestApiService } from '../services/requestApi.service';
import { IProduct } from '../interfaces/IProduct';
import { Observable } from 'rxjs';
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

  constructor() {
    this.products$ = this.reqApi.getData('laptops?limit=5')
  }

  /**Agreagar producto */
  addProduct(product:IProduct){

  }

}
