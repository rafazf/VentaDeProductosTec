import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedProductsService } from '../services/sharedProducts.service';

@Component({
  selector: 'pago',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pago.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagoComponent {
  cartService = inject(SharedProductsService);
  /**Proceso de pago */
  payment(){
    this.cartService.showPayment('hidden');
  }
}
