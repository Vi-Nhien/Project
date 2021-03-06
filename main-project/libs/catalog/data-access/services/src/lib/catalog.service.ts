import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createQuocGia, QuocGia, List,
  DanToc, createDanToc, TonGiao,
  createTonGiao, KhoiNganh, createKhoiNganh, NganhHocList, createNganhHoc, NganhHoc, TinhThanhList, QuanHuyenList, TinhThanh } from './catalog';

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
  getListDanToc( danToc: List) {
    return this.httpClient.post(this.apiUrlDanhMuc + 'DanTocs/List' , danToc)
  }
  deleteDanTocs(ids: number[]){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlDanhMuc+'DanTocs', options)
  }
  updateDanToc(danToc : DanToc){
    return this.httpClient.put(this.apiUrlDanhMuc+'DanTocs', danToc)
  }
  createDanToc(danToc: createDanToc){
    return this.httpClient.post(this.apiUrlDanhMuc+'DanTocs', danToc)
  }
  getDanTocById(id: number){
    return this.httpClient.post(this.apiUrlDanhMuc+'DanTocs/ById', {id})
  }
  getListTonGiao( tonGiao: List) {
    return this.httpClient.post(this.apiUrlDanhMuc + 'TonGiaos/List' , tonGiao)
  }
  deleteTonGiaos(ids: number[]){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlDanhMuc+'TonGiaos', options)
  }
  updateTonGiao(tonGiao : TonGiao){
    return this.httpClient.put(this.apiUrlDanhMuc+'TonGiaos', tonGiao)
  }
  createTonGiao(tonGiao: createTonGiao){
    return this.httpClient.post(this.apiUrlDanhMuc+'TonGiaos', tonGiao)
  }
  getTonGiaoById(id: number){
    return this.httpClient.post(this.apiUrlDanhMuc+'TonGiaos/ById', {id})
  }

  getListKhoiNganh( khoiNganh: List) {
    return this.httpClient.post(this.apiUrlDanhMuc + 'KhoiNganhs/List' , khoiNganh)
  }
  deleteKhoiNganhs(ids: number[]){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlDanhMuc+'KhoiNganhs', options)
  }
  updateKhoiNganh(khoiNganh : KhoiNganh){
    return this.httpClient.put(this.apiUrlDanhMuc+'KhoiNganhs', khoiNganh)
  }
  createKhoiNganh(khoiNganh: createKhoiNganh){
    return this.httpClient.post(this.apiUrlDanhMuc+'KhoiNganhs', khoiNganh)
  }
  getKhoiNganhById(id: number){
    return this.httpClient.post(this.apiUrlDanhMuc+'KhoiNganhs/ById', {id})
  }



  getListNganhHoc(nganhHoc : NganhHocList){
    return this.httpClient.post(this.apiUrlDanhMuc+'Nganhs/List', nganhHoc)
  }
  deleteNganhHocs(ids: number[]){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlDanhMuc+'Nganhs', options)
  }
  updateNganhHoc(nganhHoc : NganhHoc){
    return this.httpClient.put(this.apiUrlDanhMuc+'Nganhs', nganhHoc)
  }
  createNganhHoc(nganhHoc: createNganhHoc){
    return this.httpClient.post(this.apiUrlDanhMuc+'Nganhs', nganhHoc)
  }
  getNganhHocById(id: number){
    return this.httpClient.post(this.apiUrlDanhMuc+'Nganhs/ById', {id})
  }
  getListPhongBans(list: any){
    let url = 'https://gateway.ascvn.vn/api/v1/HRM_SDTC/PhongBans/List'
    return this.httpClient.post(url, list)
  }


  getTinhThanhList(listTinhthanh: TinhThanhList){
    return this.httpClient.post(this.apiUrlDanhMuc + 'TinhThanhs/List', listTinhthanh);
  }
  createTinhThanh(tinhThanh : TinhThanh){
    return this.httpClient.post(this.apiUrlDanhMuc+'TinhThanhs', tinhThanh);
  }
  deleteTinhThanh (ids: number[]){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlDanhMuc+'TinhThanhs', options);
  }
  getQuanhuyenList(listQuanHuyen : QuanHuyenList){
    return this.httpClient.post(this.apiUrlDanhMuc+'QuanHuyens/List', listQuanHuyen)
  }

}
