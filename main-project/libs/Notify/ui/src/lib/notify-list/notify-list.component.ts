
import vi from '@angular/common/locales/vi';
import { NotifyModalComponent } from './../notify-modal/notify-modal.component';
import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'



import { registerLocaleData } from '@angular/common';
import { NotifyService } from '@main-project/notify/data-access/services'
import { Router } from '@angular/router';

@Component({
  selector: 'main-project-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss']
})
export class NotifyListComponent implements OnInit {

  btnStyleStar: boolean = false;

  selectedValue = null;

  thongBaosList: any = [];
  nguoiDungXemThongBaoList: any = [];

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private notifyService: NotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.getThongBaos();
    registerLocaleData(vi);
    // this.getNguoiDungXemThongBaoList();

  }

  getThongBaos() {
    let ThongBaos: any =[]
    this.notifyService.getAllThongBaos().subscribe(
      res => {
        ThongBaos = res;
        this.thongBaosList = ThongBaos.result.items;
        console.log(this.thongBaosList)
      }
    );
  }

  getNguoiDungXemThongBaoList() {
    let NguoiDungXemThongBao : any =[];
    this.notifyService.getNguoiDungXemThongBao().subscribe(
      (res: any = []) => {
        NguoiDungXemThongBao = res;
        this.nguoiDungXemThongBaoList =  NguoiDungXemThongBao.result.items;
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
      nzBodyStyle: { padding: '20px', outline: 'none' },
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
      nzOnOk: () => this.updateMessage(),
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    });

  }



  updateMessage(): void {
    this.message.success('Update successfully', {
      nzDuration: 3000
    });
  }

  notifyDetail(data: any){
    if(data){
      this.router.navigate(['/notify/page', data.idGuid])
    }
  }

}
