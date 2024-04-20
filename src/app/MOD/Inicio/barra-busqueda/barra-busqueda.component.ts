import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  /**Buscar un producto en la barra de busqueda y agregar al carrito */
  searchAdd(searchValue: any): any {
    console.log(searchValue)
  }
}
