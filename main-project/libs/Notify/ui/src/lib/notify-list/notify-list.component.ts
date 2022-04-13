import vi from '@angular/common/locales/vi';
import { NotifyModalComponent } from './../notify-modal/notify-modal.component';
import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'



import { registerLocaleData } from '@angular/common';
import { NotifyService, ThongBao } from 'libs/Notify/data-access/services/src/lib/notify.service';
@Component({
  selector: 'main-project-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss']
})
export class NotifyListComponent implements OnInit {

  selectedValue = null;



  thongBaosList : ThongBao[] | undefined

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private notifyService : NotifyService) { }

  ngOnInit(): void {
    this.getThongBaos()
    registerLocaleData(vi);

  }

  getThongBaos(){
    this.notifyService.getAllThongBaos().subscribe(
      res =>{
        this.thongBaosList = res;
        console.log(this.thongBaosList)
      }

    )
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

}
