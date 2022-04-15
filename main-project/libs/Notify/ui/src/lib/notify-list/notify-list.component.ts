import { Observable } from 'rxjs';
import vi from '@angular/common/locales/vi';
import { NotifyModalComponent } from './../notify-modal/notify-modal.component';
import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'



import { registerLocaleData } from '@angular/common';
import { NotifyService  } from '@main-project/notify/data-access/services'

@Component({
  selector: 'main-project-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss']
})
export class NotifyListComponent implements OnInit {

  selectedValue = null;

  allChecked = 0;
  indeterminate = true;

  thongBaosList :any = [];
  nguoiDungXemThongBaoList: any = [];

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private notifyService : NotifyService) { }

  ngOnInit(): void {
    this.getThongBaos();
    registerLocaleData(vi);
    // this.getNguoiDungXemThongBaoList();

  }

  getThongBaos(){
    this.notifyService.getAllThongBaos().subscribe(
      (res: any = []) =>{
        this.thongBaosList = res;
        console.log(this.thongBaosList)
      }
    );
  }

  getNguoiDungXemThongBaoList(){
    this.notifyService.getNguoiDungXemThongBao().subscribe(
      (res: any = []) =>{
        this.nguoiDungXemThongBaoList = res;
        console.log(this.nguoiDungXemThongBaoList)
      }
    );
  }


  // -----modal edit------

  // eslint-disable-next-line @typescript-eslint/member-ordering
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
    this.getNguoiDungXemThongBaoList();

  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  // ---modal delete------

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzAutofocus: null,
      nzBodyStyle: { padding: '20px', outline:'none' },
      nzMaskClosable: true,
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
      nzOkText: 'Save',
      nzOnOk: () =>this.updateMessage(),
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    });

  }



  updateMessage(): void {
    this.message.success('Update successfully', {
      nzDuration: 3000
    });
  }


  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.thongBaosList = this.thongBaosList.map((item: any) => ({
        ...item,
        flag: 1
      }));
    } else {
      this.thongBaosList = this.thongBaosList.map((item: any) => ({
        ...item,
        flag: 0
      }));
    }
  }

  updateSingleChecked(): void {
    if (this.thongBaosList.every((item: { flag: any; }) => !item.flag)) {
      this.allChecked = 0;
      this.indeterminate = false;
    } else if (this.thongBaosList.every((item: { flag: any; }) => item.flag)) {
      this.allChecked = 0;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

}
