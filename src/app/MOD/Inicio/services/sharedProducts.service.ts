import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { IProductCar } from '../interfaces/IProductCar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedProductsService {

  private arrProducts:IProduct[] = [];
  private cart:IProductCar[]=[];
  private _products:BehaviorSubject<IProduct[]>;
  private _myCart:BehaviorSubject<IProductCar[]>;
  private  _payment:BehaviorSubject<string>;

  constructor() { 
    this._products = new BehaviorSubject(this.arrProducts);
    this._myCart = new BehaviorSubject<IProductCar[]>([]);
    this._payment = new BehaviorSubject<string>('');
  }

  get myCart(){
    return this._myCart.asObservable();
  }

  get products(){
    return this._products.asObservable();
  }

  addProduct(data:IProduct){
    const idSearch = this.arrProducts.some((item)=>{return item.id === data.id});

    if(idSearch){
      this.cart.map(item => {
        item.product.id === data.id ? { cant: item.cant++} : '';
      } );
      this._myCart.next(this.cart);
    }else{ 
      this.arrProducts.push(data) ;
      this.cart.push({product:data, cant:1});
      this._myCart.next(this.cart);
    }
  }

  rmProduct(index:number){
    this.arrProducts.splice(index,1);
    this._products.next(this.arrProducts);

    this.cart.splice(index,1);
    this._myCart.next(this.cart);
  }

  setQuantity(cant:number,id:number){
    this.cart.map(item=>{
      item.product.id === id ? item.cant=cant : ''
    })
    this._myCart.next(this.cart);
  }

  updateQuantity(type:string, id:number){
    this.cart.forEach((item)=> {
      if(item.product.id === id){
        switch (type) {
          case '+':
            item.cant++;
            break;
          case '-' :
            if(item.cant >  0 )
              item.cant--;
            else
              alert('No se puede eliminar el producto');
            break;
         default:
           console.log("Error en el tipo de operación");
       }
       this._myCart.next(this.cart);
      }
    })
  }

  /**mostrar sección de pago al seleccionar boton de pagar */
  showPayment(band:string){
    this._payment.next(band);
  }
  getBandPayment(){
    return this._payment.asObservable();
  }
}
