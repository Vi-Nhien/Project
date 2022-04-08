import { NotifyModalComponent } from './../notify-modal/notify-modal.component';
import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'



import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

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
  styleUrls: ['./notify-list.component.scss']
})
export class NotifyListComponent implements OnInit {

  selectedValue = null;

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
      checked: true
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
      checked: false
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
      checked: true
    }

  ];





  constructor(
    private modal: NzModalService,
    private message: NzMessageService) { }

  ngOnInit(): void {

    registerLocaleData(zh);

  }




  // -----modal edit------

  // eslint-disable-next-line @typescript-eslint/member-ordering
  isVisible = false;

  showModal(): void {
    this.isVisible = true;

  }

  // ---modal delete------

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzAutofocus: null,
      nzBodyStyle: { padding: '20px' },
      nzStyle: { padding: '0' },
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteMessage(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteMessage(): void {
    this.message.success('Delete successfully', {
      nzDuration: 3000
    });
  }

  updateComponentModal(): void {
    this.modal.create({
      nzContent: NotifyModalComponent,
      nzClosable: true,
      nzAutofocus: null,
      nzWidth: '700px',
      // nzOnOk: () =>this.updateMessage(),
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      // nzOnCancel: () => console.log('Cancel'),
    });

  }



  updateMessage(): void {
    this.message.success('Update successfully', {
      nzDuration: 3000
    });
  }

}
