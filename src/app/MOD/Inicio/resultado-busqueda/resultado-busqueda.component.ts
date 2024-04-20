import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'resultado-busqueda',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './resultado-busqueda.component.html',
  styleUrl: './resultado-busqueda.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultadoBusquedaComponent { }
