import { environment } from './../../../../../../apps/notify-app/src/environments/environment';

import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ThongBao, ThongBaoList } from './notify';
import { ThongBaoTinhChat } from './thongBaoTinhChat';



@Injectable({
  providedIn: 'root'
})
export class NotifyService   {
  private apiUrlThongBaoTinhChatsList: string;
  private apiUrlThongBaoTinhChats: string;
  private apiUrlThongBaoTinhChatsById : string;
  private apiUrlThongBaos: string;
  private apiUrlPhongBan: string;
  private apiUrlCoSo: string;
  private apiUrlNguoiDungXemThongBao : string;


  constructor(private httpClient: HttpClient) {
    this.apiUrlThongBaoTinhChatsList = environment.apiUrlServer + 'ThongBaoTinhChats/List';
    this.apiUrlThongBaoTinhChats = environment.apiUrlServer + 'ThongBaoTinhChats'
    this.apiUrlThongBaoTinhChatsById = environment.apiUrlServer + 'ThongBaoTinhChats/ById';
    this.apiUrlThongBaos = environment.apiUrlServer + 'ThongBaos';
    this.apiUrlNguoiDungXemThongBao = environment.apiUrlServer + 'ThongBaos/NguoiDungXemThongBao'
    this.apiUrlPhongBan = environment.apiUrlSelect + 'LoaiPhongBans/List';
    this.apiUrlCoSo = environment.apiUrlSelect + 'CoSos/List'
  }




  getAllPhongBan(): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post(this.apiUrlPhongBan, {headers : headers});
  }
  getAllCoSo(): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post(this.apiUrlCoSo, {headers : headers});
  }
  getAllThongBaoTinhChats(): Observable<ThongBaoTinhChat[]> {
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post<ThongBaoTinhChat[]>(this.apiUrlThongBaoTinhChatsList, {headers : headers});
  }
  getThongBaoThinhChatById(id: string) {
    return this.httpClient.post(this.apiUrlThongBaoTinhChatsById, {id});
  }
  updateThongBaoTinhChat(thongBaoTinhChat: ThongBaoTinhChat) {
    return this.httpClient.put(this.apiUrlThongBaoTinhChats, thongBaoTinhChat);
  }
  createThongBaoTinhChat(thongBaoTinhChat : ThongBaoTinhChat) {
    return this.httpClient.post(this.apiUrlThongBaoTinhChats, thongBaoTinhChat);
  }
  deleteThongBaoTinhChat(ids: number[])  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlThongBaoTinhChats, options);
  }


  createThongBao(thongBao : ThongBao){
    const url = 'http://192.168.0.246:5357/api/v1/ThongBaos';
    return this.httpClient.post(url, thongBao)
  }


  getAllThongBaos(pageNumber: number, pageSize: number): Observable<ThongBaoList[]> {
    let body = {pageNumber, pageSize}
    return this.httpClient.post<ThongBaoList[]>(this.apiUrlThongBaos+'/List', body );
  }


  getThongBaoById(idGuid: string) {
    const url = 'http://192.168.0.246:5357/api/v1/ThongBaos/ById'
    return this.httpClient.post(url, {idGuid})
  }
  getNguoiDungXemThongBao(){
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post<any[]>(this.apiUrlNguoiDungXemThongBao, {headers : headers});
  }
  getThongBaoClickViews(idGuid: string){
    const url = 'http://192.168.0.246:5357/api/v1/ThongBaos/ClickView'
    return this.httpClient.post(url, {idGuid})
  }

  deleteThongBaos(idsGuid: string[]){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{idsGuid}
    };
    return this.httpClient.delete(this.apiUrlThongBaos, options);
  }

  updateViewed(idsGuidThongBao: string[], trangThaiXemThongBao: number ){
    const url =  'http://192.168.0.246:5357/api/v1/ThongBaos/Viewed';
    return this.httpClient.post(url, {idsGuidThongBao, trangThaiXemThongBao})
  }

  flagThongBao(idsGuidThongBao: string[], flag : number){
    const url = 'http://192.168.0.246:5357/api/v1/ThongBaos/Flag'
    return this.httpClient.post(url, {idsGuidThongBao, flag})
  }

}
