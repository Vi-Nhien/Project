import { Component } from '@angular/core';

interface ListThongBao {
  key: string;
  tieude: string;
  quantrong: boolean;
  ngayHetHan: string;
  nguoiTao: string;
  ngayTao: string;
  daXem: number;
  chuaXem: number;
  checked: boolean
}

@Component({
  selector: 'main-project-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.css']
})
export class NotifyListComponent {



  listOfData: ListThongBao[] = [
    {
      key: '1',
      tieude: 'hello world',
      quantrong: true,
      ngayHetHan: '22/12/2021',
      nguoiTao: 'alex',
      ngayTao: '22/10/2021',
      daXem: 2,
      chuaXem: 20,
      checked : true
    },
    {
      key: '2',
      tieude: 'Thử nghiệm',
      quantrong: true,
      ngayHetHan: '22/2/2022',
      nguoiTao: 'admin',
      ngayTao: '22/10/2021',
      daXem: 24,
      chuaXem: 10,
      checked :false
    },
    {
      key: '3',
      tieude: 'thông báo V/v',
      quantrong: true,
      ngayHetHan: '2/3/2022',
      nguoiTao: 'alex',
      ngayTao: '22/10/2021',
      daXem: 2,
      chuaXem: 20,
      checked : true
    }

  ];

}
