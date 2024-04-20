import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CarritoProductosComponent } from './carrito-productos/carrito-productos.component';
@Component({
  selector: 'inicio',
  standalone: true,
  imports: [
    CommonModule,BarraBusquedaComponent,ListaProductosComponent, CarritoProductosComponent
  ],
  templateUrl: './Inicio.component.html',
  styleUrl: './Inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InicioComponent {
}
