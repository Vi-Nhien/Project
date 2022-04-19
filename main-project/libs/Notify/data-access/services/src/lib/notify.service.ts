import { environment } from './../../../../../../apps/notify-app/src/environments/environment';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// import { Http, Headers, Response } from '@angular/http'


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
  getAllThongBaoTinhChats(): Observable<any[]> {
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post<any[]>(this.apiUrlThongBaoTinhChatsList, {headers : headers});
  }
  getThongBaoThinhChatById(id: string) {
    return this.httpClient.post(this.apiUrlThongBaoTinhChatsById, {id});
  }
  updateThongBaoTinhChat(thongBaoTinhChat: any) {
    return this.httpClient.put(this.apiUrlThongBaoTinhChats, thongBaoTinhChat);
  }
  createThongBaoTinhChat(thongBaoTinhChat : any) {
    return this.httpClient.post(this.apiUrlThongBaoTinhChats, thongBaoTinhChat);
  }
  deleteThongBaoTinhChat(thongBaoTinhChat: any)  {
    let params = new HttpParams();
    params = params.append('',thongBaoTinhChat.id);
    return this.httpClient.delete(this.apiUrlThongBaoTinhChats, {params});
  }


  getAllThongBaos(): Observable<any[]> {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post<any[]>(this.apiUrlThongBaos+'/List', {headers: headers});
  }
  getThongBaoById(id: string) {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(`${this.apiUrlThongBaos}/${id}`, {headers: headers})
  }
  getNguoiDungXemThongBao(){
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post<any[]>(this.apiUrlNguoiDungXemThongBao, {headers : headers});
  }



}
