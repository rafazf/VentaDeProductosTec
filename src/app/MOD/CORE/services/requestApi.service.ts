import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { ICliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  public cliente:ICliente;
  public arrClientes:ICliente[]=[];

  constructor(private http:HttpClient) {
    this.cliente = {nombre:'',id:''};
  }

  getData(uri:string):Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://freetestapi.com/api/v1/'+uri)
  }

  getProduct(uri:string):Observable<IProduct>{
    return this.http.get<IProduct>('https://freetestapi.com/api/v1/'+uri)
  }

  saveClient(cliente:ICliente){
    this.arrClientes.push(cliente);
    this.setLocal();
  }

  getClient():ICliente[]{
    return this.arrClientes;
  }

  getOnlyClient(cliente:string){
    return this.arrClientes.filter((item)=>{
      return item.nombre.includes(cliente) 
      })
  }

  setLocal(){
    localStorage.setItem('clientes',JSON.stringify(this.arrClientes));
  }

  getLocal(){
    var ls = localStorage.getItem('clientes') || '';
    this.arrClientes = JSON.parse(ls);
  }

}
