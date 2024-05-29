import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedProductsService } from '../../../CORE/services/sharedProducts.service';
import { IData, IProductCar } from '../../../CORE/interfaces/IProductCar';
import { Observable, map } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'comprobante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComprobanteComponent {
  _sharedService = inject(SharedProductsService);
  dataClient$: Observable<IData>;
  dataCart$: Observable<IProductCar[]>;
  total: number = 0;
  constructor() {
    this.dataClient$ = this._sharedService.getDataVenta();
    this.dataCart$ = this._sharedService.myCart;
    this._sharedService.myCart
      .pipe(
        map((itemCart) => {
          return itemCart.reduce(
            (prev, curr) => prev + curr.product.publication_year * curr.cant,
            0
          );
        })
      )
      .subscribe((val) => (this.total = val));
  }

  generatePDF() {
    const DATA = document.getElementById('comprobante')!;

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_comprobante.pdf`);
      });
  }
}
