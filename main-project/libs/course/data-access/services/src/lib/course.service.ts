import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '@main-project/course/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  apiCourse = 'https://gateway.ascvn.vn/api/v1/LMS_HOCLIEU/';
  constructor(
    private httpClient: HttpClient,
  ) { }


  getKhoaHocList(KhoaHocList : List) {
    return this.httpClient.post(this.apiCourse +'KhoaHocs/GetList' , KhoaHocList)

  }
  getKhoaHocDetail(idGuid: string){
    return this.httpClient.post(this.apiCourse+'KhoaHocs/GetDetail', idGuid)
  }
}
