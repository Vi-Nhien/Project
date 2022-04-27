import { environment } from './../../../../../../apps/notify-app/src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ThongBao, ThongBaoList } from './notify';
import { ThongBaoTinhChat } from './thongBaoTinhChat';

@Injectable({
  providedIn: 'root'
})
export class NotifyService   {
  private apiUrlThongBaoTinhChats: string;
  private apiUrlThongBaos: string;
  private apiUrlPhongBan: string;
  private apiUrlCoSo: string;
  private filterSubject = new Subject<any>();
  constructor(private httpClient: HttpClient) {
    this.apiUrlThongBaos = environment.apiUrlServer + 'ThongBaos';
    this.apiUrlThongBaoTinhChats = environment.apiUrlServer + 'ThongBaoTinhChats'
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
    return this.httpClient.post<ThongBaoTinhChat[]>(this.apiUrlThongBaoTinhChats+'/List', {headers : headers});
  }
  getThongBaoThinhChatById(id: string) {
    return this.httpClient.post(this.apiUrlThongBaoTinhChats+'/ById', {id});
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
  filterThongBao(filterThongBao: ThongBaoList){
    this.filterSubject.next({  filterThongBao});
  }
  getFilter(){
    return this.filterSubject.asObservable();
  }
  filterThongBaos(thongBao : ThongBaoList){
    let body = thongBao;
    return this.httpClient.post(this.apiUrlThongBaos+'/List', body);
  }
  createThongBao(thongBao : ThongBao){
    return this.httpClient.post(this.apiUrlThongBaos, thongBao)
  }
  getAllThongBaos(pageNumber: number, pageSize: number): Observable<ThongBaoList[]> {
    let body = {pageNumber, pageSize}
    return this.httpClient.post<ThongBaoList[]>(this.apiUrlThongBaos+'/List', body );
  }
  updateThongBao(thongBao : any){
    return this.httpClient.put(this.apiUrlThongBaos, thongBao)
  }
  getThongBaoById(idGuid: string) {
    return this.httpClient.post(this.apiUrlThongBaos+'/ById', {idGuid})
  }
  getNguoiDungXemThongBao(){
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post<any[]>(this.apiUrlThongBaos+'/NguoiDungXemThongBao', {headers : headers});
  }
  getThongBaoClickViews(idGuid: string){
    return this.httpClient.post(this.apiUrlThongBaos+'/ClickView', {idGuid})
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
    return this.httpClient.post(this.apiUrlThongBaos+'/Viewed', {idsGuidThongBao, trangThaiXemThongBao})
  }
  flagThongBao(idsGuidThongBao: string[], flag : number){
    return this.httpClient.post(this.apiUrlThongBaos+'/Flag', {idsGuidThongBao, flag})
  }

}
