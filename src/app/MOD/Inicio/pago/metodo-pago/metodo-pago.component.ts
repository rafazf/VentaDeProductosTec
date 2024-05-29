import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SharedProductsService } from '../../../CORE/services/sharedProducts.service';
import { IProductCar } from '../../../CORE/interfaces/IProductCar';
import { Observable, map } from 'rxjs';
import { ICliente } from '../../../CORE/interfaces/cliente.interface';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestApiService } from '../../../CORE/services/requestApi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'metodo-pago',
  standalone: true,
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetodoPagoComponent implements OnInit{ 
  sharedService = inject(SharedProductsService);
  dataCart$:Observable<IProductCar[]>;
  total:number=0;
  cliente:string='';
  clienteSeleccion:string='';
  clienteComprobante:string='';
  requestApi = inject(RequestApiService);

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
  isLoading:boolean = false;
  showAddClient:boolean=true;
  showCliente:boolean=true;
  showComprobante:boolean=true;

  dataClients:ICliente[] = [];
  _fb = inject(FormBuilder);
  formClient = this._fb.group({
    id:[''],
    nombre: ['']
  })
  constructor(private toastr: ToastrService) {
    this.dataCart$ = this.sharedService.myCart
  }
  ngOnInit(): void {
    this.sharedService.myCart.pipe(map((itemCart=>{
      return itemCart.reduce((prev, curr)=> prev + curr.product.publication_year * curr.cant,0)
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
  addCliente(cliente:ICliente){
    this.clienteSeleccion = cliente.nombre+' | '+cliente.id;
    this.cliente = ''
    this.isLoading = false;
    this.showCliente = false;
  }
  saveCliente(){
    this.showSuccess('NUEVO CLIENTE REGISTRADO')
    this.requestApi.saveClient(this.formClient.value as ICliente)
    this.formClient.reset();
    this.showAddClient = true;
  }
  seachCliente(event:any):any{
    if(event !== ''){
      this.isLoading=true;
      var data = this.requestApi.getOnlyClient(event)!
      if(data !== undefined){
        this.dataClients = data;
      }else{
        this.dataClients = [];
      }
    }else{
      this.isLoading=false;
    }
  }
  onShowClient(){
    this.showAddClient = !this.showAddClient;
  }
  onComprobante(type:string){
    this.clienteComprobante=type;
    this.showComprobante=false;
  }
  confirmSale(){
    this.showSuccess('VENTA REGISTRADA')
    this.sharedService.setDataVenta(this.clienteSeleccion,this.clienteComprobante)
    this.sharedService.showComprobante(true);
  }
  showSuccess(msg:string) {
    this.toastr.success(msg, 'Success');
  }
}
