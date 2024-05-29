import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedProductsService } from '../../CORE/services/sharedProducts.service';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
@Component({
  selector: 'pago',
  standalone: true,
  imports: [
    CommonModule,MetodoPagoComponent
  ],
  templateUrl: './pago.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagoComponent {
  cartService = inject(SharedProductsService);
  showConfirmPay:boolean=false;
  /**Proceso de pago */
  payment(){
    this.cartService.showPayment('hidden');
  }
  /**Selección de pago */
  paymentSelection(method:string){
    this.cartService.paymentSelection(method);
  }
  constructor() {
    this.cartService.getPaymentSelection().subscribe((pay)=>{
      pay === 'cash' ? this.showConfirmPay = true : this.showConfirmPay = false;
    })
  }
}
