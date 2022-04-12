import { environment } from './../../../../../../apps/notify-app/src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ThongBaoTinhChat{
  id: string,
  maTinhChat: string,
  tenTinhChat: string,
  maMau: string,
  ghiChu: string,
  soThuTu: number,
  isVisible: boolean
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private apiUrlThongBaoTinhChats: string;
  private apiUrlThongBaos: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrlThongBaoTinhChats = environment.apiUrlServer + 'ThongBaoTinhChats';
    this.apiUrlThongBaos = environment.apiUrlServer + '/ThongBaos';
  }
  getAllThongBaoTinhChats() :Observable<ThongBaoTinhChat[]> {
    return this.httpClient.get<ThongBaoTinhChat[]>(this.apiUrlThongBaoTinhChats);
  }
  getThongBaoThinhChatById(id: string){
      return this.httpClient.get<ThongBaoTinhChat>(`${this.apiUrlThongBaoTinhChats}/${id}`);
  }
  updateThongBaoTinhChat(thongBaoTinhChat : ThongBaoTinhChat) :Observable<ThongBaoTinhChat>{
    return this.httpClient.put<ThongBaoTinhChat>(`${this.apiUrlThongBaoTinhChats}/${thongBaoTinhChat.id}`,thongBaoTinhChat);
  }
  createThongBaoTinhChat(thongBaoTinhChat : ThongBaoTinhChat){
    return this.httpClient.post(this.apiUrlThongBaoTinhChats, thongBaoTinhChat);
  }
  deleteThongBaoTinhChat(id: string){
    return this.httpClient.delete(`${this.apiUrlThongBaoTinhChats}/${id}`);
  }


  getAllThongBaos(){
    return this.httpClient.get(this.apiUrlThongBaos);
  }
  getThongBaoById(id : string){
    return this.httpClient.get(`${this.apiUrlThongBaos}/${id}`)
  }






}
