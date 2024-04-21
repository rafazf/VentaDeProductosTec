import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedProductsService } from './services/sharedProducts.service';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CarritoProductosComponent } from './carrito-productos/carrito-productos.component';
import { PagoComponent } from './pago/pago.component';
@Component({
  selector: 'inicio',
  standalone: true,
  imports: [
    CommonModule,
    BarraBusquedaComponent,
    ListaProductosComponent,
    CarritoProductosComponent,
    PagoComponent
  ],
  templateUrl: './Inicio.component.html',
  styleUrl: './Inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InicioComponent {
  sharedService = inject(SharedProductsService);
  showSectionPay: boolean = false;
  selecctionPayment: boolean = false;

  constructor() {
    this.sharedService.getBandPayment().subscribe((band) => {
      if (band === 'show') {
        this.showSectionPay = true;
      } else {
        this.showSectionPay = false;
      }
    });
    this.sharedService.getPaymentSelection().subscribe((pay)=>{
      pay ==='none'  ? this.selecctionPayment=false : this.selecctionPayment=true ;
    })
  }
}
