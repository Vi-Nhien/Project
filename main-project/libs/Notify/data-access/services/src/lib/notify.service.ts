import { environment } from './../../../../../../apps/notify-app/src/environments/environment';

import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';



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
  deleteThongBaoTinhChat(ids: number[])  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{ids}
    };
    return this.httpClient.delete(this.apiUrlThongBaoTinhChats, options);
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
  getThongBaoClickViews(idGuid: string){
    const url = 'http://192.168.0.246:5357/api/v1/ThongBaos/ClickView'
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    //   body:{idGuid }
    // };
    // return this.httpClient.post(this.apiUrlThongBaos+'/ClickView', options)
    // return this.httpClient.post(url , options);
    return this.httpClient.post(url, {idGuid})
  }


}
