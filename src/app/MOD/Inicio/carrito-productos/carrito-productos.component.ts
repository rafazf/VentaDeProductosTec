import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'carrito-productos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './carrito-productos.component.html',
  styleUrl: './carrito-productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoProductosComponent {

}
