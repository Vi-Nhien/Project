import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createQuocGia, QuocGia, List } from './catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  apiUrlDanhMuc: string = 'https://gateway.ascvn.vn/api/v1/DM/';

  constructor(
    private httpClient: HttpClient
  ) { }
  getListQuocGia( quocGia: List) {
    return this.httpClient.post(this.apiUrlDanhMuc + 'QuocGias/List' , quocGia)
  }
  deleteQuocGias(ids: number[]){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlDanhMuc+'QuocGias', options)
  }
  updateQuocGia(quocGia : QuocGia){
    return this.httpClient.put(this.apiUrlDanhMuc+'QuocGias', quocGia)
  }
  createQuocGia(quocGia: createQuocGia){
    return this.httpClient.post(this.apiUrlDanhMuc+'QuocGias', quocGia)
  }
  getQuocGiaById(id: number){
    return this.httpClient.post(this.apiUrlDanhMuc+'QuocGias/ById', {id})
  }








}
