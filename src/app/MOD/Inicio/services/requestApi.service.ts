import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  constructor(private http:HttpClient) { }

  getData(uri:string):Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://freetestapi.com/api/v1/'+uri)
  }

  getProduct(uri:string):Observable<IProduct>{
    return this.http.get<IProduct>('https://freetestapi.com/api/v1/'+uri)
  }

}
