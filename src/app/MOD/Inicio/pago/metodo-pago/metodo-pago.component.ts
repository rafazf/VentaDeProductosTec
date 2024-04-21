import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SharedProductsService } from '../../services/sharedProducts.service';
import { IProductCar } from '../../interfaces/IProductCar';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'metodo-pago',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetodoPagoComponent implements OnInit{ 
  sharedService = inject(SharedProductsService);
  dataCart$:Observable<IProductCar[]>;
  total:number=0;
  tipoComprobante=[{
    type: "Boleta",
    selection:false
  },
  {
    type: "Factura",
    selection:false
  },
  {
    type: "Ticket",
    selection:false
  }];
  constructor() {
    this.dataCart$ = this.sharedService.myCart
  }
  ngOnInit(): void {
    this.sharedService.myCart.pipe(map((itemCart=>{
      return itemCart.reduce((prev, curr)=> prev + curr.product.price * curr.cant,0)
    }))
  ).subscribe(val=>this.total = val);
  }
  vaucherSelection(type:string){
    console.log(type)
  }
  onCancel(){
    this.sharedService.showPayment('hidden');
    this.sharedService.paymentSelection('none');
  }
}
