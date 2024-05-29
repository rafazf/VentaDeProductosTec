import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SharedProductsService } from '../../CORE/services/sharedProducts.service';
import { IProductCar } from '../../CORE/interfaces/IProductCar';
import { Observable, map } from 'rxjs';
import { RequestApiService } from '../../CORE/services/requestApi.service';
import { IProduct } from '../../CORE/interfaces/IProduct';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'carrito-productos',
  standalone: true,
  imports: [
    CommonModule,FormsModule
  ],
  templateUrl: './carrito-productos.component.html',
  styleUrl: './carrito-productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoProductosComponent implements OnInit{
  card$: Observable<IProductCar[]>
  reqApi = inject(RequestApiService);
  cartService = inject(SharedProductsService);
  arrCard: IProduct[]=[];
  total:number=0;
  habilitarPago:boolean = false;
  constructor() {
    this.card$ = this.cartService.myCart
  }
  
  ngOnInit(): void {
    this.cartService.products.subscribe((data)=>{
      this.arrCard = data;
    })

    this.cartService.myCart.pipe(
      map((itemCart=>{
        return itemCart.reduce((prev, curr)=> prev + curr.product.publication_year * curr.cant,0)
      }))
    ).subscribe(val=>{
      this.total = val
      if(val>0){
        this.habilitarPago = false
      }else{
        this.habilitarPago = true
      }
    });
  }

  /**Eliminar un producto del carrito */
  onDeleted(index:number){
    this.cartService.rmProduct(index);
  }
   /**Asignar cantidad de un producto por su id */
   setCant(cant:any, id:number){
    if(cant === ''){
     this.cartService.setQuantity(0,id);
    }else{
     this.cartService.setQuantity(parseInt(cant),id);
    }
   }
  /**Actualizar la cantidad segun los boton de + - */
  updateQuantity(operation:string, id: number){
    this.cartService.updateQuantity(operation,id);
  }
  /**Proceso de pago */
  payment(){
    this.cartService.showPayment('show');
  }
}
